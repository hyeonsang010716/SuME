import { React, useState, useEffect } from 'react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calenderSummary.css';

function CalenderSummary(){
  const [events, setEvents] = useState([
      {
        title: 'test',
        start: format(new Date(), 'yyyy-MM-dd'),
        end: '2025-02-13',
        description: '1오늘의 일정입니다.',
      },
      {
        title: 'exam',
        start: '2025-02-01',
        end: '2025-02-20',
        description: '2오늘의 일정입니다.',
      },
      {
        title: 'study',
        start: format(new Date(), 'yyyy-MM-dd'),
        end: '2025-02-27',
        description: '3오늘의 일정입니다.',
      },
    ]);

  return(
    <div className="w-full h-full p-0">
      <h1 className="mb-4 text-xl">
        Calendar
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 월간 보기, 클릭과 드래그 플러그인 추가
        initialView="dayGridMonth"
        headerToolbar={false}
        dayHeaders={false}
        height="80%"
        width="100%"
        events={events}
        eventDisplay="auto"
      />
    </div>
  )
}

export default CalenderSummary;