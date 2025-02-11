import { useState } from 'react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import "./calender.css";

function Calender(){
  const [events, setEvents] = useState([
    {
    title: '테스트 이벤트',
    start: format(new Date(), 'yyyy-MM-dd'),
    end: '2025-02-13',
    },
    {
    title: '테스트 이벤트22',
    start: format(new Date(), 'yyyy-MM-dd'),
    end: '2025-02-13',
    },
    {
      title: '테스트 이벤트333',
      start: format(new Date(), 'yyyy-MM-dd'),
      end: '2025-02-13',
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트 클릭 시 동작
  const handleEventClick = (info) => {
    try {
      console.log("이벤트 클릭:", info.event.title);
      setSelectedEvent(info.event);
      setShowModal(true);
    } catch (error) {
      console.error('이벤트 처리 중 오류 발생:', error.message);
      alert('이벤트를 처리하는 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return(
    <div className="flex flex-col items-center h-[525px] bg-white shadow-none md:shadow-xl rounded-none md:rounded-[60px] pt-4 w-full md:w-[800px] xl:w-[400px]">
      <h1>Calender</h1>
      <FullCalendar
        plugins={[dayGridPlugin]} // 월간 보기 플러그인 추가
        initialView="dayGridMonth"  
        events={events}
        eventClick={handleEventClick}
      />

      // 이벤트 클릭시 생성 창창
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl relative w-[90%] max-w-[400px] min-h-[200px]">
            <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">{selectedEvent.title}</h2>
            <div className="space-y-4">
              <p className="flex justify-between items-center">
                <span className="font-medium text-gray-600">시작 날짜</span>
                <span>{selectedEvent.start?.toLocaleDateString()}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-medium text-gray-600">종료 날짜</span>
                <span>{selectedEvent.end?.toLocaleDateString()}</span>
              </p>
            </div>
            <button 
              className="w-full mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calender;