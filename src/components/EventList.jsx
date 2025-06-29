import { useEffect, useState } from 'react';
import api from '../services/api';

function daysUntil(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  const diffTime = eventDate.setHours(0,0,0,0) - today.setHours(0,0,0,0);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [newEvent, setNewEvent] = useState({ title: '', description: '', eventDate: '' });
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [taskLoading, setTaskLoading] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (eventId) => {
    const res = await api.get(`/events/${eventId}/tasks`);
    setTasks((prev) => ({ ...prev, [eventId]: res.data }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.eventDate) return;
    await api.post('/events', {
      title: newEvent.title,
      description: newEvent.description,
      eventDate: newEvent.eventDate,
    });
    setNewEvent({ title: '', description: '', eventDate: '' });
    fetchEvents();
  };

  const handleExpand = async (eventId) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
      return;
    }
    setExpandedEventId(eventId);
    if (!tasks[eventId]) {
      await fetchTasks(eventId);
    }
  };

  const handleTaskInputChange = (eventId, value) => {
    setNewTask((prev) => ({ ...prev, [eventId]: value }));
  };

  const handleCreateTask = async (eventId, e) => {
    e.preventDefault();
    if (!newTask[eventId]) return;
    setTaskLoading((prev) => ({ ...prev, [eventId]: true }));
    await api.post(`/events/${eventId}/tasks`, { description: newTask[eventId] });
    setNewTask((prev) => ({ ...prev, [eventId]: '' }));
    await fetchTasks(eventId);
    setTaskLoading((prev) => ({ ...prev, [eventId]: false }));
  };

  const handleToggleTask = async (eventId, task) => {
    setTaskLoading((prev) => ({ ...prev, [eventId]: true }));
    await api.patch(`/events/${eventId}/tasks/${task.id}`, { isCompleted: !task.isCompleted });
    await fetchTasks(eventId);
    setTaskLoading((prev) => ({ ...prev, [eventId]: false }));
  };

  const handleDeleteEvent = async (eventId) => {
    await api.delete(`/events/${eventId}`);
    fetchEvents();
  };

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const daysA = daysUntil(a.eventDate);
      const daysB = daysUntil(b.eventDate);
      return daysA - daysB;
    });

  return (
    <div className="min-h-screen bg-[#0e0e10] flex flex-col items-center justify-center py-12">
      {/* Card: Crear evento */}
      <div className="bg-[#151518] rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-[#23232a] mb-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Añadir Nuevo Evento</h2>
        <form onSubmit={handleCreateEvent} className="flex flex-col md:flex-row gap-2 mb-2">
          <input
            type="text"
            name="title"
            placeholder="Crea un nuevo evento"
            value={newEvent.title}
            onChange={handleInputChange}
            className="flex-1 border border-[#23232a] rounded bg-[#23232a] text-white px-3 py-2 placeholder-gray-400"
            required
          />
          <input
            type="date"
            name="eventDate"
            value={newEvent.eventDate}
            onChange={handleInputChange}
            className="border border-[#23232a] rounded bg-[#23232a] text-white px-3 py-2 placeholder-gray-400"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition-transform duration-200 hover:scale-105">Add</button>
        </form>
      </div>

      {/* Card: Lista de eventos */}
      <div className="bg-[#151518] rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-[#23232a]">
        <h2 className="text-2xl font-bold mb-6 text-white">Tus Eventos</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar evento..."
            value={search}
            onChange={handleSearch}
            className="flex-1 border border-[#23232a] rounded bg-[#23232a] text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>
        <div className="divide-y divide-[#23232a] bg-[#1e1e22] rounded-xl shadow">
          {filteredEvents.map((event) => {
            const days = daysUntil(event.eventDate);
            let dateLabel = '';
            let dateColor = '';
            if (days === 0) {
              dateLabel = 'Today';
              dateColor = 'bg-red-500';
            } else if (days < 0) {
              dateLabel = 'Overdue';
              dateColor = 'bg-red-700';
            } else {
              dateLabel = `${days} days`;
              dateColor = 'bg-gray-700';
            }
            return (
              <div key={event.id} className="flex flex-col py-4 px-4 hover:bg-[#23232a] transition cursor-pointer rounded-xl">
                <div className="flex items-center gap-3" onClick={() => handleExpand(event.id)}>
                  <span className="text-2xl cursor-move select-none text-gray-500">⋮⋮</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" disabled />
                  <span className="font-medium text-lg flex-1 text-white">{event.title}</span>
                  <span className="relative flex items-center justify-center w-14 h-14 mr-2">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="7" y="14" width="42" height="32" rx="7" fill="none" stroke="white" strokeWidth="3"/>
                      <rect x="7" y="14" width="42" height="7" rx="3.5" fill="none" stroke="white" strokeWidth="3"/>
                      <rect x="16" y="7" width="3.5" height="10.5" rx="1.75" fill="white"/>
                      <rect x="36.5" y="7" width="3.5" height="10.5" rx="1.75" fill="white"/>
                    </svg>
                    <span className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                      <span className="bg-blue-700 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border border-[#23232a] shadow flex items-center gap-0.5" style={{minWidth: '1.5rem', textAlign: 'center'}}>
                        {days} <span className="text-[10px] font-normal">días</span>
                      </span>
                    </span>
                  </span>
                  <button
                    className="ml-2 group"
                    onClick={e => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                    title="Eliminar evento"
                    style={{ padding: 0, background: 'none', border: 'none' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-200 group-hover:scale-125"
                    >
                      <path d="M3 6h18" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                      <rect x="5" y="6" width="14" height="14" rx="2" stroke="red" strokeWidth="2"/>
                      <path d="M10 11v6" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M14 11v6" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {expandedEventId === event.id && (
                  <div className="mt-3 ml-8 bg-[#23232a] p-3 rounded-xl">
                    <form onSubmit={(e) => handleCreateTask(event.id, e)} className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Add a new task"
                        value={newTask[event.id] || ''}
                        onChange={(e) => handleTaskInputChange(event.id, e.target.value)}
                        className="flex-1 border border-[#23232a] rounded bg-[#1e1e22] text-white px-3 py-2 placeholder-gray-400"
                        required
                      />
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-transform duration-200 hover:scale-105" disabled={taskLoading[event.id]}>Add Task</button>
                    </form>
                    <h4 className="font-bold mb-2 text-gray-200">Tareas</h4>
                    <ul>
                      {(tasks[event.id] || []).length === 0 && <li className="text-gray-500">Sin tareas</li>}
                      {(tasks[event.id] || []).map((task) => (
                        <li key={task.id} className="flex items-center gap-2 mb-1">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => handleToggleTask(event.id, task)}
                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                          />
                          <span className={task.isCompleted ? 'line-through text-gray-400' : 'text-white'}>{task.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          {filteredEvents.length === 0 && (
            <div className="text-center text-gray-500 py-8 bg-[#23232a] rounded-xl">No hay eventos</div>
          )}
        </div>
        {loading && <div className="text-center text-gray-400 mt-4">Cargando...</div>}
      </div>
    </div>
  );
};

export default EventList; 