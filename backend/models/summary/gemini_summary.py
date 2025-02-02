from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from typing import TypedDict
from langgraph.graph import StateGraph, START, END

from models.summary.prompts import rgSummary_Prompt

mgLLm = None
mgChain = None
mgGraph = None

class State(TypedDict):
    summary_response : str # 생성된 회의 요약
    content : str  # 회의 내용


def rInit_SummaryChain() -> None:
    """Gemini Summary Init func"""
    global mgLLm, mgChain

    mgLLm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash-latest",
    )

    prompt = PromptTemplate(
        template=rgSummary_Prompt,
        input_variables=["content"],
    )
    
    mgChain = prompt | mgLLm | StrOutputParser()
    
    return None

def mCall_Generate_Summary(state: State) -> dict:
    """요약 생성 함수"""
    response = mgChain.invoke({"content" : state["content"]})

    if response == "부적절한 단어가 포함되어 있습니다":
        raise Exception("부적절한 단어가 포함되어 있습니다")
    
    return {"summary_response" : response}

def rInit_Graph() -> None:
    """그래프 초기화 함수"""
    global mgGraph
    
    graph_builder = StateGraph(State)

    graph_builder.add_node("generate_summary", mCall_Generate_Summary)

    graph_builder.add_edge(START, "generate_summary")
    graph_builder.add_edge("generate_summary", END)

    mgGraph = graph_builder.compile()
    
    return None

def rCall_GetSummary(content: str) -> str:
    """Summary 실행함수, 회의내용을 필요"""

    response = mgGraph.invoke({"content" : content})

    return response["summary_response"]

if __name__ == "__main__":
    load_dotenv()

    tmp = """우리는 GeForce를 활용해 인공지능을 가능하게 했으며, 이제 인공지능이 다시 GeForce를 혁신하고 있습니다. 

오늘 우리는 차세대 RTX Black 12 시리즈를 발표합니다. 함께 살펴보시죠.

여기 있습니다, 우리의 새로운 GeForce RTX 50 시리즈인 Blackwell 아키텍처입니다. 이 GPU는 그야말로 괴물과 같습니다. 920억 개의 트랜지스터, 4,000 TOPS, **AI 성능 4 페타플롭스(PFLOPS)**를 자랑하며, 이는 이전 세대인 Ada보다 3배 더 높은 성능입니다. 앞서 보여드린 픽셀들을 생성하기 위해 이 모든 성능이 필요합니다.

RTX 50 시리즈는 **380 테라플롭스(TFLOPS)**의 레이트레이싱 성능을 제공합니다. 이는 우리가 계산해야 하는 픽셀을 가장 아름다운 이미지로 만들어내기 위한 것입니다. 또한, 125 테라플롭스의 셰이더 성능을 갖추고 있습니다. 여기에는 부동소수점(FP)과 정수(INT)을 동시에 처리하는 듀얼 셰이더가 포함되어 있습니다.

이 GPU는 마이크론(Micron)의 G7 메모리를 탑재하여 초당 1.8 테라바이트(TB/s)의 대역폭을 제공합니다. 이는 이전 세대보다 2배 향상된 성능입니다. 또한, 이번 세대는 AI 작업과 컴퓨터 그래픽 작업을 혼합하여 처리할 수 있는 능력을 제공합니다.

특히, 이번 세대의 놀라운 점 중 하나는 프로그래머블 셰이더가 이제 **신경망(Neural Network)**을 처리할 수 있다는 점입니다. 셰이더는 신경망을 운용할 수 있으며, 이를 통해 우리는 **신경 텍스처 압축(Neuro-Texture Compression)**과 **신경 재질 셰이딩(Neuro-Material Shading)**을 발명했습니다. 결과적으로, AI가 학습한 텍스처 및 압축 알고리즘을 활용해 이전에는 불가능했던 매우 아름다운 이미지를 생성할 수 있습니다.

이것이 바로 새로운 RTX Blackwell 5090입니다. 심지어 이 GPU의 기계 설계 또한 기적과 같습니다. 보십시오, 2개의 팬이 장착되어 있으며, 이 그래픽카드는 그 자체로 거대한 팬과도 같습니다. 전압 조절 설계는 최첨단 기술을 활용했으며, 엔지니어링 팀이 정말 훌륭한 작업을 해냈습니다.

이제 RTX 4090과 성능을 비교해보겠습니다. 많은 분들이 RTX 4090을 가지고 계실 것입니다. 이 제품의 가격은 **$1,599(약 160만 원)**이며, 이는 아마도 가장 가치 있는 투자일 것입니다. $1,599로 1만 달러(약 1,000만 원)의 PC 엔터테인먼트 센터를 업그레이드할 수 있습니다. RTX 4090은 액체 냉각 시스템과 화려한 조명을 갖춘, 말 그대로 현대판 홈 시어터와 같습니다.

그러나 이제 Blackwell 패밀리에서는 **RTX 570이 RTX 4090급 성능을 $549(약 55만 원)**에 제공합니다. 이것은 인공지능이 없이는 불가능했을 성과입니다. 4 TOPS의 AI 텐서 코어와 G7 메모리 덕분에 이런 가격 대비 성능이 구현되었습니다.

RTX 50 시리즈의 전체 라인업은 RTX 5070부터 RTX 5090까지입니다. RTX 5090은 RTX 4090 대비 2배의 성능을 제공합니다. 대량 생산은 2025년 1월부터 시작될 예정입니다.

이 새로운 RTX 50 시리즈는 GPU 기술의 새로운 패러다임을 제시하며, 믿을 수 없을 정도의 성능을 합리적인 가격에 제공합니다.

RTX 5090은 RTX 4090의 성능을 2배로 제공합니다. 물론, 우리는 대규모 생산을 시작했으며, 제품은 1월부터 대량 공급될 예정입니다. 정말 놀랍지만, 우리는 이러한 엄청난 성능을 지닌 GPU를 노트북에도 탑재할 수 있었습니다. 예를 들어, RTX 5070이 탑재된 노트북은 4090급 성능을 제공하며, 가격은 **$1,299(약 130만 원)**입니다.

어딘가에 그 제품이 있을 텐데요, 이 놀라운 그래픽카드인 Blackwell을 축소시켜 노트북에 넣는다는 것이 상상이 되시나요? 그게 가능한 이유는 바로 인공지능(AI) 덕분입니다. 

우리가 대부분의 픽셀을 생성하는 작업은 **텐서 코어(Tensor Core)**를 사용해 처리하고 있기 때문에, 필요한 픽셀만 레이 트레이싱으로 계산하며 나머지는 AI가 생성합니다. 이렇게 함으로써 에너지 효율성이 비약적으로 향상되었습니다.

컴퓨터 그래픽의 미래는 **뉴로 렌더링(Neuro-Rendering)**입니다. 이는 인공지능과 컴퓨터 그래픽의 융합으로, 놀라운 기술 발전을 가져오고 있습니다. 게다가 RTX Blackwell 시리즈는 두께가 14.9mm밖에 되지 않는 얇은 노트북에도 RTX 5090 같은 강력한 GPU를 탑재할 수 있게 합니다. RTX 5080, 5070 TI, 그리고 5070 같은 다양한 라인업으로 구성되어 있습니다.

RTX Blackwell 패밀리는 GeForce의 혁신을 통해 AI의 대중화를 실현했고, 이제 AI가 다시 GeForce를 혁신하는 데 기여하고 있습니다.

이제 AI에 대해 이야기해 보겠습니다. NVIDIA의 본사로 이동해 실제 AI 혁신을 살펴보겠습니다. 현재 AI 업계는 인공지능의 규모를 확장하기 위해 치열한 경쟁을 벌이고 있습니다. **스케일링 법칙(Scaling Law)**은 여러 세대에 걸쳐 연구자들과 업계가 관찰하고 입증한 강력한 모델입니다.

이 스케일링 법칙은, 더 많은 데이터와 더 큰 모델, 그리고 더 많은 컴퓨팅 파워를 활용할수록 모델의 성능과 능력이 더 좋아진다는 것을 보여줍니다. 이 법칙은 지속적으로 적용되고 있으며, 인터넷에서 생성되는 데이터는 매년 2배씩 증가하고 있습니다. 앞으로 몇 년 안에, 인류는 그동안 생성한 모든 데이터를 초과하는 양을 생산하게 될 것입니다.

이제 데이터는 텍스트, 이미지, 동영상, 오디오 등 멀티모달(multi-modal) 형태로 점점 더 다양해지고 있으며, 모든 데이터는 AI의 기초 지식을 학습하는 데 사용될 수 있습니다.

앞으로 몇 년 안에 인류는 지금까지 생성한 모든 데이터보다 더 많은 데이터를 생산할 것입니다. 우리는 여전히 방대한 양의 데이터를 생성하고 있으며, 이 데이터는 점점 더 다중 모달(multimodal)로 변모하고 있습니다. 즉, 동영상, 이미지, 소리 등의 다양한 형태의 데이터가 포함됩니다. 이러한 데이터는 AI의 기본 지식을 훈련하는 데 활용될 수 있습니다.

그러나 실제로는 두 가지 추가적인 확장 법칙이 나타났습니다. 첫 번째는 '사후 학습 확장 법칙'(Post-training Scaling Law)입니다. 이 법칙은 강화 학습(재정학습)이나 인간의 피드백 같은 기술을 사용합니다. 기본적으로 AI는 인간의 질의에 기반해 답변을 생성하며, 인간은 이 답변에 피드백을 제공합니다. 

이 과정은 단순한 것처럼 보일 수 있지만 실제로는 상당히 복잡합니다. 높은 품질의 많은 질문과 피드백을 통해 AI는 자신을 개선하고 특정 도메인에 특화된 능력을 강화할 수 있습니다. 예를 들어 수학 문제를 해결하거나, 논리를 개선하는 데 더 능숙해질 수 있습니다.

이는 마치 멘토나 코치가 피드백을 제공하는 것과 같습니다. 사람이 학교를 마친 후 시험을 보고, 그 결과에 대한 피드백을 받아 더 나아지는 것과 비슷한 방식입니다. 또한 강화 학습 외에도 '합성 데이터 생성'(Synthetic Data Generation) 기술이 있습니다. 이는 AI가 특정 문제의 답을 알고 있는 상태에서 반복적으로 연습하며 개선하는 방식입니다.

AI는 매우 복잡하고 해결하기 어려운 문제에 직면할 수 있습니다. 이 문제는 기능적으로 검증 가능하고 명확한 답이 있는 경우가 많습니다. 예를 들어, 정리를 증명하거나 기하학 문제를 해결하는 것처럼요. 이러한 문제들을 해결하는 과정에서 AI는 강화 학습을 통해 스스로를 개선하고 학습하게 됩니다. 이를 '사후 학습'(Post-training)이라고 부르며, 이를 위해 막대한 양의 연산 능력이 필요합니다. 그러나 그 결과는 놀라운 AI 모델을 탄생시킵니다.

세 번째 확장 법칙은 '테스트 시 확장 법칙'(Test-time Scaling Law)입니다. 이는 AI가 실제로 사용되는 시점에서 발생하는 법칙입니다. 이 단계에서 AI는 자원을 다르게 배분하는 능력을 발휘합니다. AI가 자신의 매개변수를 개선하는 대신, 얼마나 많은 계산 자원을 사용할지 결정하여 원하는 답을 생성하는 데 집중합니다. 이는 마치 사람이 문제를 해결하기 위해 "생각"하거나 "추론"하는 과정과 유사합니다.
""" 
    rInit_Summary()
    output = rCall_Graph(tmp)

    print(output)
