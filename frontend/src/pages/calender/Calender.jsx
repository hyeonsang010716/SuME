import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import "./calender.css";

function Calender(){
  return(
    <div className="flex flex-col items-center h-[525px] bg-white shadow-none md:shadow-xl rounded-none md:rounded-[60px] pt-4 w-full md:w-[800px] xl:w-[400px]">
      <h1>Calender</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 월간 보기, 클릭과 드래그 플러그인 추가
        initialView="dayGridMonth"  
        editable={true} // 이벤트 드래그 가능 여부
        selectable={true} // 빈 공간 드래그/선택 가능 여부
        eventClick={(info) => {
          alert(`Event: ${info.event.title}`); // 클릭한 일정의 제목 표시
        }}
        dateClick={(info) => {
          alert(`Date: ${info.dateStr}`); // 클릭한 날짜 표시
        }}
      />
    </div>
  )
}

export default Calender;