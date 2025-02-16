from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser, PydanticOutputParser
from langchain.output_parsers.fix import OutputFixingParser
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from typing import TypedDict, List
from langgraph.graph import StateGraph, START, END
from datetime import datetime, date
from pydantic import BaseModel, Field
import pytz


from models.summary.prompts import rgSummary_Prompt, rgCalendar_Prompt

class Calendar(BaseModel):
    """개별 일정을 표현하는 Pydantic 모델."""

    title: str = Field(..., description="일정의 제목을 입력하세요.")
    description: str = Field(..., description="일정의 간략한 설명을 입력하세요.")

    start_date: date = Field(..., description="일정 시작 날짜 (YYYY-MM-DD)")
    end_date: date = Field(..., description="일정 종료 날짜 (YYYY-MM-DD)")
    
class CalendarList(BaseModel):
    """여러 개의 일정을 포함하는 Pydantic 모델."""
    schedules: List[Calendar] = Field(..., description="추출된 여러 개의 일정 리스트")
  
class State(TypedDict):
    summary_response : str # 생성된 회의 요약
    content : str  # 회의 내용
    calendar_response : list #생성된 캘린더 데이터
    
mgLLm = None
mgSummaryChain = None
mgCalendarChain = None
mgGraph = None
mgKST = pytz.timezone('Asia/Seoul')

def rInit_SummaryChain() -> None:
    """Gemini Summary Init func"""
    global mgLLm, mgSummaryChain

    mgLLm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash-latest",
    )

    prompt = PromptTemplate(
        template=rgSummary_Prompt,
        input_variables=["content"],
    )
    
    mgSummaryChain = prompt | mgLLm | StrOutputParser()
    
    return None

def mCall_Generate_Summary(state: State) -> dict:
    """요약 생성 함수"""
    response = mgSummaryChain.invoke({"content" : state["content"]})

    if response == "부적절한 단어가 포함되어 있습니다":
        raise Exception("부적절한 단어가 포함되어 있습니다")
    
    return {"summary_response" : response}

def rInit_CalendarChain() -> None:
    """Calendar Data Generate ChainInit func"""
    global mgCalendarChain

    output_parser = OutputFixingParser.from_llm(parser=PydanticOutputParser(pydantic_object=CalendarList), llm=mgLLm, max_retries=3)
    prompt_template = ChatPromptTemplate.from_template(rgCalendar_Prompt).partial(format_instructions=output_parser.get_format_instructions())
    mgCalendarChain = (prompt_template | mgLLm | output_parser)
    
    return None

def mCall_CalendarChain(state: State) -> dict:
    """캘린더 데이터 생성 함수"""
    
    today = datetime.now(mgKST).strftime("%Y-%m-%d (%A)")
    
    response = mgCalendarChain.invoke({"content" : state["content"], "today" : today})
    
    return {"calendar_response" : response.schedules}

def rInit_Graph() -> None:
    """그래프 초기화 함수"""
    global mgGraph
    
    rInit_SummaryChain()
    rInit_CalendarChain()
    
    graph_builder = StateGraph(State)

    graph_builder.add_node("generate_summary", mCall_Generate_Summary)
    graph_builder.add_node("generate_calendar", mCall_CalendarChain)
    
    graph_builder.add_edge(START, "generate_summary")
    graph_builder.add_edge("generate_summary", "generate_calendar")
    graph_builder.add_edge("generate_calendar", END)

    mgGraph = graph_builder.compile()
    
    return None

def rCall_GetSummary(content: str) -> tuple[str, list]:
    """Summary 실행함수, 회의내용을 필요"""

    response = mgGraph.invoke({"content" : content})

    return response["summary_response"], response["calendar_response"]
