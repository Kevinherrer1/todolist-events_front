import EventList from './components/EventList'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Advanced Event List
          </h1>
          <p className="text-gray-600 mb-6">
            Frontend (React + Vite) conectado con Backend (NestJS)
          </p>
        </div>
        <EventList />
      </div>
    </div>
  )
}

export default App
