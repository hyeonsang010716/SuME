import { React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calenderSummary.css';

function CalenderSummary(){
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error loading events:", error));
  }, []);

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
        height="80%"
        width="100%"
        events={events}
        eventDisplay="auto"
      />
    </div>
  )
}

export default CalenderSummary;