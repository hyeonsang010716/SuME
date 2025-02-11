import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import API from '../../API';

function Calender(){
  const [events, setEvents] = useState([
    {
      title: '111',
      start: format(new Date(), 'yyyy-MM-dd'),
      end: '2025-02-13',
      description: '1오늘의 일정입니다.',
    },
    {
      title: '222',
      start: '2025-02-01',
      end: '2025-02-20',
      description: '2오늘의 일정입니다.',
    },
    {
      title: '333',
      start: format(new Date(), 'yyyy-MM-dd'),
      end: '2025-02-27',
      description: '3오늘의 일정입니다.',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await API.getEvents();
        const processedEvents = eventData.map(event => ({
          ...event,
          start: event.start || format(new Date(), 'yyyy-MM-dd')
        }));
        setEvents(processedEvents);
      } catch (error) {
        console.error('일정을 불러오는데 실패했습니다:', error);
      }
    };

    fetchEvents();
  }, []);

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
    <div className="flex justify-center gap-6">
      <div className="flex flex-col items-center h-[525px] bg-white shadow-none md:shadow-xl rounded-none md:rounded-[60px] pt-4 w-full md:w-[800px] xl:w-[400px]">
        <div className="calendar-wrapper h-full w-full px-4">
          <FullCalendar
            plugins={[dayGridPlugin]} // 월간 보기 플러그인 추가
            initialView="dayGridMonth"  
            events={events}
            eventClick={handleEventClick}
            height="100%"
            contentHeight="100%"
            aspectRatio={1}
            headerToolbar={{
              start: 'prev',
              center: 'title',
              end: 'next'
            }}
            titleFormat={{ month: 'long', year: 'numeric' }}
            buttonText={{
              prev: '이전',
              next: '다음'
            }}
            dayHeaderClassNames="py-1 text-sm"
            titleClassNames="text-lg font-bold w-[180px] text-center mx-auto"
            buttonClassNames="px-3 py-1"
            headerClassNames="flex items-center justify-between mb-2 h-[40px]"
            dayCellClassNames="text-sm"
          />
        </div>

        {/* 이벤트 클릭 시 생성 창 */}
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

      {/* 마감 일정 리스트 */}
      <div className="hidden xl:block w-[300px] h-[525px] bg-white shadow-xl rounded-[60px] p-6">
        <h2 className="text-xl font-bold mb-4">다가오는 일정</h2>
        <div className="overflow-y-auto h-[calc(100%-3rem)]">
          {events
            .filter(event => {
              const dueDate = new Date(event.end);
              const today = new Date();
              const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
              return diffDays >= 0; // 7일 이내의 일정만 표시
            })
            .sort((a, b) => new Date(a.end) - new Date(b.end))
            .map(event => (
              <div key={event.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold">{event.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(event.end).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Calender;