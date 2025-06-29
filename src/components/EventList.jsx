"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import {
  Calendar,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Target,
  Sparkles,
  CalendarDays,
  ListTodo,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { api } from "../services/api"

function daysUntil(dateString) {
  const today = new Date()
  const eventDate = new Date(dateString)
  const diffTime = eventDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default function EventList() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState("")
  const [newEvent, setNewEvent] = useState({ title: "", description: "", eventDate: "" })
  const [expandedEventId, setExpandedEventId] = useState(null)
  const [tasks, setTasks] = useState({})
  const [loading, setLoading] = useState(false)
  const [newTask, setNewTask] = useState({})
  const [taskLoading, setTaskLoading] = useState({})
  const [error, setError] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("checking")

  useEffect(() => {
    checkConnection()
    fetchEvents()
  }, [])

  const checkConnection = async () => {
    try {
      await api.testConnection()
      setConnectionStatus("connected")
      setError("")
    } catch (err) {
      setConnectionStatus("disconnected")
      setError("No se pudo conectar con el servidor. Asegúrate de que el backend esté ejecutándose.")
    }
  }

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await api.getEvents()
      setEvents(response)
      setError("")
    } catch (err) {
      setError("Error al cargar eventos: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const fetchTasks = async (eventId) => {
    try {
      const response = await api.getTasks(eventId)
      setTasks((prev) => ({ ...prev, [eventId]: response }))
    } catch (err) {
      console.error("Error fetching tasks:", err)
      setError("Error al cargar tareas: " + (err.response?.data?.message || err.message))
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.eventDate) return

    try {
      await api.createEvent({
      title: newEvent.title,
      description: newEvent.description,
      eventDate: newEvent.eventDate,
      })
      setNewEvent({ title: "", description: "", eventDate: "" })
      fetchEvents()
      setError("")
    } catch (err) {
      setError("Error al crear evento: " + (err.response?.data?.message || err.message))
    }
  }

  const handleExpand = async (eventId) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null)
      return
    }

    setExpandedEventId(eventId)
    if (!tasks[eventId]) {
      await fetchTasks(eventId)
    }
  }

  const handleTaskInputChange = (eventId, value) => {
    setNewTask((prev) => ({ ...prev, [eventId]: value }))
  }

  const handleCreateTask = async (eventId, e) => {
    e.preventDefault()
    if (!newTask[eventId]) return

    setTaskLoading((prev) => ({ ...prev, [eventId]: true }))
    try {
      await api.createTask(eventId, { description: newTask[eventId] })
      setNewTask((prev) => ({ ...prev, [eventId]: "" }))
      await fetchTasks(eventId)
      setError("")
    } catch (err) {
      setError("Error al crear tarea: " + (err.response?.data?.message || err.message))
    } finally {
      setTaskLoading((prev) => ({ ...prev, [eventId]: false }))
    }
  }

  const handleToggleTask = async (eventId, task) => {
    setTaskLoading((prev) => ({ ...prev, [eventId]: true }))
    try {
      await api.updateTask(eventId, task.id, { isCompleted: !task.isCompleted })
      await fetchTasks(eventId)
      setError("")
    } catch (err) {
      setError("Error al actualizar tarea: " + (err.response?.data?.message || err.message))
    } finally {
      setTaskLoading((prev) => ({ ...prev, [eventId]: false }))
    }
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await api.deleteEvent(eventId)
      fetchEvents()
      setError("")
    } catch (err) {
      setError("Error al eliminar evento: " + (err.response?.data?.message || err.message))
    }
  }

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const daysA = daysUntil(a.eventDate)
      const daysB = daysUntil(b.eventDate)
      return daysA - daysB
    })

  const getDaysLabel = (days) => {
    if (days === 0) return { label: "Hoy", color: "bg-red-500", textColor: "text-red-400" }
    if (days < 0) return { label: "Vencido", color: "bg-red-600", textColor: "text-red-400" }
    if (days === 1) return { label: "1 día", color: "bg-orange-500", textColor: "text-orange-400" }
    if (days <= 7) return { label: `${days} días`, color: "bg-yellow-500", textColor: "text-yellow-400" }
    return { label: `${days} días`, color: "bg-blue-500", textColor: "text-blue-400" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 backdrop-blur-sm bg-slate-950/50 border-b border-slate-800/50">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Event</span>
            <span className="text-white">ify</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <Badge 
            variant="outline" 
            className={`${
              connectionStatus === "connected" 
                ? "border-green-500/30 text-green-400 bg-green-500/10" 
                : connectionStatus === "checking"
                ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                : "border-red-500/30 text-red-400 bg-red-500/10"
            }`}
          >
            {connectionStatus === "connected" && <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>}
            {connectionStatus === "checking" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
            {connectionStatus === "disconnected" && <AlertCircle className="w-3 h-3 mr-1" />}
            {connectionStatus === "connected" ? "Conectado" : connectionStatus === "checking" ? "Conectando..." : "Desconectado"}
          </Badge>
          
         
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="relative z-10 mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Gestiona tus Eventos
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Crea eventos, asigna tareas y mantén todo organizado en un solo lugar
          </p>
        </div>

        {/* Create Event Card */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="w-5 h-5 text-green-400" />
              Crear Nuevo Evento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Título del Evento</label>
                  <Input
            type="text"
            name="title"
                    placeholder="Ej: Reunión de equipo, Cumpleaños..."
            value={newEvent.title}
            onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
            required
          />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Fecha del Evento</label>
                  <Input
            type="date"
            name="eventDate"
            value={newEvent.eventDate}
            onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500"
            required
          />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Descripción (Opcional)</label>
                <Textarea
                  name="description"
                  placeholder="Describe tu evento..."
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Evento
              </Button>
        </form>
          </CardContent>
        </Card>

        {/* Events List Card */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                Tus Eventos ({filteredEvents.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
            type="text"
                  placeholder="Buscar eventos..."
            value={search}
            onChange={handleSearch}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 w-64"
          />
        </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                <span className="ml-2 text-slate-400">Cargando eventos...</span>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">
                  {search ? "No se encontraron eventos" : "No tienes eventos aún"}
                </h3>
                <p className="text-slate-500">
                  {search ? "Intenta con otro término de búsqueda" : "Crea tu primer evento para comenzar"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
          {filteredEvents.map((event) => {
                  const days = daysUntil(event.eventDate)
                  const { label, color, textColor } = getDaysLabel(days)
                  const isExpanded = expandedEventId === event.id
                  const eventTasks = tasks[event.id] || []
                  const completedTasks = eventTasks.filter((task) => task.isCompleted).length

            return (
                    <Card
                      key={event.id}
                      className="bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20"
                    >
                      <CardContent className="p-0">
                        <div
                          className="flex items-center gap-4 p-6 cursor-pointer hover:bg-slate-700/20 transition-colors duration-200"
                          onClick={() => handleExpand(event.id)}
                        >
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white mb-1 truncate">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm text-slate-400 truncate">{event.description}</p>
                            )}
                            {eventTasks.length > 0 && (
                              <div className="flex items-center gap-2 mt-2">
                                <ListTodo className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-500">
                                  {completedTasks}/{eventTasks.length} tareas completadas
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${textColor} border-current bg-current/10 flex items-center gap-1`}>
                              <Clock className="w-3 h-3 mr-1 text-blue-400" />
                              {label}
                            </Badge>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id);
                              }}
                              className="text-red-400 hover:text-red-600 bg-transparent p-0 m-0 border-none outline-none focus:outline-none transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                              title="Eliminar"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                </div>

                        {isExpanded && (
                          <div className="border-t border-slate-600/50 p-6 bg-slate-800/30">
                            <div className="space-y-4">
                              {/* Add Task Form */}
                              <form onSubmit={(e) => handleCreateTask(event.id, e)} className="flex gap-2">
                                <Input
                        type="text"
                                  placeholder="Agregar nueva tarea..."
                                  value={newTask[event.id] || ""}
                        onChange={(e) => handleTaskInputChange(event.id, e.target.value)}
                                  className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500"
                        required
                      />
                                <Button
                                  type="submit"
                                  disabled={taskLoading[event.id]}
                                  className="bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                >
                                  {taskLoading[event.id] ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Plus className="w-4 h-4" />
                                  )}
                                </Button>
                    </form>

                              {/* Tasks List */}
                              <div className="space-y-2">
                                <h4 className="font-medium text-slate-300 flex items-center gap-2">
                                  <ListTodo className="w-4 h-4" />
                                  Tareas ({eventTasks.length})
                                </h4>

                                {eventTasks.length === 0 ? (
                                  <p className="text-slate-500 text-sm py-4 text-center">
                                    No hay tareas aún. ¡Agrega la primera!
                                  </p>
                                ) : (
                                  <div className="space-y-2">
                                    {eventTasks.map((task) => (
                                      <div
                                        key={task.id}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200"
                                      >
                                        <Checkbox
                            checked={task.isCompleted}
                                          onCheckedChange={() => handleToggleTask(event.id, task)}
                                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        />
                                        <span
                                          className={`flex-1 transition-all duration-200 ${
                                            task.isCompleted ? "line-through text-slate-500" : "text-slate-200"
                                          }`}
                                        >
                                          {task.description}
                                        </span>
                                        {task.isCompleted && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                  </div>
                )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
            >
              ← Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 