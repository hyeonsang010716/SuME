import { React, useState, useEffect } from 'react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calenderSummary.css';
import API from '../../API';

function CalenderSummary(){
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await API.getEvents();
        setEvents(eventData);
      } catch (error) {
        console.error("일정을 불러오는 데 실패했습니다:", error);
      }
    };

    fetchEvents();
  }, []);

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
