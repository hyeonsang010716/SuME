import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../../API';
import './calender.css';

function Calender() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: ''
  });

  const fetchEvents = async () => {
    try {
      const eventData = await API.getEvents();
      setEvents(eventData);
    } catch (error) {
      console.error("일정을 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    setNewEvent({
      title: '',
      start: info.dateStr,
      end: info.dateStr,
      description: ''
    });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      description: info.event.extendedProps.description || ''
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.start || !newEvent.end) {
      alert("이벤트 제목, 시작 날짜, 끝 날짜를 입력해주세요.");
      return;
    }
    try {
      await API.createEvent(newEvent);
      setShowModal(false);
      setNewEvent({ title: '', start: '', end: '', description: '' });
      await fetchEvents();
    } catch (error) {
      console.error("일정 추가 실패:", error);
      alert("일정을 추가하는 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    const confirmDelete = window.confirm("이 일정을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await API.deleteEvent(selectedEvent.id);
      setShowEventModal(false);
      await fetchEvents();
    } catch (error) {
      console.error("이벤트 삭제 실패:", error);
      alert("이벤트 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex justify-center gap-6 opacity-70">
      <div className="flex flex-col items-center h-[525px] bg-white shadow-md rounded pt-4 w-full md:w-[800px] xl:w-[400px]">
        <div className="calendar-wrapper h-full w-full px-4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="100%"
            contentHeight="100%"
            headerToolbar={{ start: 'prev', center: 'title', end: 'next' }}
            buttonText={{ prev: '이전', next: '다음' }}
          />
        </div>

        {/* 일정 추가 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
              <h2 className="text-xl font-bold mb-4">새 일정 추가</h2>
              <label className="block mb-2 text-sm font-medium text-gray-600">제목</label>
              <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full p-2 border rounded mb-2" placeholder="이벤트 제목 입력" />
              <label className="block mb-2 text-sm font-medium text-gray-600">시작 날짜</label>
              <input type="date" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} className="w-full p-2 border rounded mb-2" />
              <label className="block mb-2 text-sm font-medium text-gray-600">끝 날짜</label>
              <input type="date" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} className="w-full p-2 border rounded mb-2" />
              <label className="block mb-2 text-sm font-medium text-gray-600">설명</label>
              <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full p-2 border rounded mb-2" placeholder="이벤트 설명 입력" />
              <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded" onClick={handleSaveEvent}>설정 완료</button>
              <button className="w-full bg-gray-500 text-white py-2 mt-2 rounded" onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        )}

        {/* 일정 정보 모달 */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
              <h2 className="text-xl font-bold mb-4">일정 정보</h2>
              <p><strong>제목:</strong> {selectedEvent.title}</p>
              <p><strong>기간:</strong> {selectedEvent.start} ~ {selectedEvent.end}</p>
              <p><strong>설명:</strong> {selectedEvent.description}</p>
              <button className="w-full bg-red-500 text-white py-2 mt-4 rounded" onClick={handleDeleteEvent}>이벤트 삭제</button>
              <button className="w-full bg-gray-500 text-white py-2 mt-2 rounded" onClick={() => setShowEventModal(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>

      {/* 마감 일정 리스트 */}
      <div className="flex flex-col items-center justify-between">
        <div className="hidden xl:block w-[300px] h-[400px] bg-white shadow-xl p-4 pt-6">
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
                <div key={event.id} className="mb-4 p-3 bg-gray-50 border-t-2">
                  <div className="text-sm font-bold">{event.title}</div>
                  <div className="text-xs text-gray-500 font-bold">
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
        <button className="w-[250px] h-[80px] bg-blue-500 hover:bg-blue-700 transition duration-300 text-white rounded shadow-lg" onClick={handleDateClick}>
          새 일정 추가
        </button>
      </div>
    </div>
  );
}

export default Calender;
