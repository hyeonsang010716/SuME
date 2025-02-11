import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calender.css';

function CalenderSummary(){
  return(
    <div className="w-full h-full p-0">
      <h1 className="mb-4 text-xl">
        Calender
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 월간 보기, 클릭과 드래그 플러그인 추가
        initialView="dayGridMonth"
        headerToolbar={false}
        dayHeaders={false}
        height="90%"
        width="100%"
      />
    </div>
  )
}

export default CalenderSummary;