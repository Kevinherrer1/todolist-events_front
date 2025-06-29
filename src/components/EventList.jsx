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

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#faf7ef] rounded-xl shadow p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Advanced Todo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearch}
          className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <form onSubmit={handleCreateEvent} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Add a new event"
          value={newEvent.title}
          onChange={handleInputChange}
          className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white"
          required
        />
        <input
          type="date"
          name="eventDate"
          value={newEvent.eventDate}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 bg-white"
          required
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800">Add</button>
      </form>
      <div className="divide-y divide-gray-200 bg-white rounded-xl shadow">
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
            dateColor = 'bg-gray-300';
          }
          return (
            <div key={event.id} className="flex flex-col py-4 px-4 hover:bg-[#f5f3ea] transition cursor-pointer">
              <div className="flex items-center gap-3" onClick={() => handleExpand(event.id)}>
                <span className="text-2xl cursor-move select-none">⋮⋮</span>
                <input type="checkbox" className="w-5 h-5" disabled />
                <span className="font-medium text-lg flex-1">{event.title}</span>
                <span className={`text-white px-3 py-1 rounded-full text-xs font-bold ${dateColor}`}>{dateLabel}</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold ml-2">Personal</span>
              </div>
              {expandedEventId === event.id && (
                <div className="mt-3 ml-8 bg-[#f8f6ef] p-3 rounded">
                  <form onSubmit={(e) => handleCreateTask(event.id, e)} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add a new task"
                      value={newTask[event.id] || ''}
                      onChange={(e) => handleTaskInputChange(event.id, e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white"
                      required
                    />
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-800" disabled={taskLoading[event.id]}>Add Task</button>
                  </form>
                  <h4 className="font-bold mb-2 text-gray-700">Tareas</h4>
                  <ul>
                    {(tasks[event.id] || []).length === 0 && <li className="text-gray-400">Sin tareas</li>}
                    {(tasks[event.id] || []).map((task) => (
                      <li key={task.id} className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => handleToggleTask(event.id, task)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className={task.isCompleted ? 'line-through text-gray-400' : ''}>{task.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 py-8">No hay eventos</div>
        )}
      </div>
      {loading && <div className="text-center text-gray-500 mt-4">Cargando...</div>}
    </div>
  );
};

export default EventList; 