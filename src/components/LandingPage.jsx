"use client"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle, Circle, Clock, Target, BarChart3, Sparkles, ArrowRight, Github, Mail } from "lucide-react"
import { Link } from "react-router-dom"

const demoEvents = [
  {
    title: "🎉 Lanzamiento del Proyecto",
    daysLeft: 12,
    tasks: [
      { done: true, text: "Preparar presentación" },
      { done: false, text: "Agendar reunión con equipo" },
      { done: false, text: "Publicar en redes" },
    ],
  },
  {
    title: "🎂 Cumpleaños de Mamá",
    daysLeft: 5,
    tasks: [
      { done: true, text: "Comprar regalo" },
      { done: false, text: "Reservar restaurante" },
      { done: false, text: "Enviar invitaciones" },
    ],
  },
  {
    title: "🏆 Torneo de fútbol",
    daysLeft: 20,
    tasks: [
      { done: false, text: "Inscribir equipo" },
      { done: false, text: "Comprar uniformes" },
      { done: false, text: "Practicar jugadas" },
    ],
  },
  {
    title: "🎓 Examen final",
    daysLeft: 3,
    tasks: [
      { done: true, text: "Revisar apuntes" },
      { done: false, text: "Resolver ejercicios" },
      { done: false, text: "Dormir bien" },
    ],
  },
  {
    title: "🎤 Conferencia Tech",
    daysLeft: 30,
    tasks: [
      { done: false, text: "Preparar diapositivas" },
      { done: false, text: "Confirmar asistentes" },
      { done: false, text: "Revisar equipo" },
    ],
  },
  {
    title: "🎮 Game Jam",
    daysLeft: 7,
    tasks: [
      { done: false, text: "Formar equipo" },
      { done: false, text: "Definir idea" },
      { done: false, text: "Preparar assets" },
    ],
  },
]

export default function LandingPage() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 backdrop-blur-sm bg-slate-950/50 border-b border-slate-800/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Event</span>
            <span className="text-white">ify</span>
          </h1>
        </div>

        <nav className="flex justify-center items-center gap-8 text-sm font-medium">
          <button
            onClick={() => scrollToSection('features')}
            className="px-4 py-2 rounded transition duration-300 text-slate-300 hover:text-green-400 hover:underline bg-transparent outline-none ring-0 border-none focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none hover:scale-105 hover:shadow-lg"
            type="button"
          >
            Características
          </button>
          <Link
            to="/demo"
            className="px-4 py-2 rounded transition duration-300 text-slate-300 hover:text-blue-400 hover:underline bg-transparent outline-none ring-0 border-none focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none hover:scale-105 hover:shadow-lg"
          >
            Probar Gratis
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className="px-4 py-2 rounded transition duration-300 text-slate-300 hover:text-purple-400 hover:underline bg-transparent outline-none ring-0 border-none focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none hover:scale-105 hover:shadow-lg"
            type="button"
          >
            Acerca de Nosotros
          </button>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-12 py-20 lg:py-32 min-h-[85vh]">
        <div className="max-w-3xl flex-1 text-center lg:text-left">
        

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
            Organiza{" "}
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              eventos
            </span>
            ,<br />
            cumple tus{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              tareas
            </span>
            .
          </h2>

          <p className="text-slate-300 text-xl lg:text-2xl mb-10 leading-relaxed">
            Crea eventos con cuenta regresiva y gestión de tareas, perfecto para todo tipo de planes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <Link  onClick={() => scrollToSection('features')} className="flex items-center text-white">
                Explorar características
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-4 transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-transparent"
            >
              <Link to="/demo" className="flex items-center">
                Probar Gratis
                <Sparkles className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Gratis para siempre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <span>Sin tarjeta de crédito</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
            <div className="relative w-[320px] h-[480px] lg:w-[380px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 transform hover:scale-105 transition-all duration-500">
              <img
                src="/create-event-landing.jpg"
                alt="Eventify App Preview"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-slate-900/50 backdrop-blur-sm py-24 px-6 lg:px-12" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400 bg-purple-500/10">
              Características Principales
            </Badge>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Descubre todo lo que puedes lograr
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para hacer tu vida más organizada y productiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-400">Cuenta regresiva</h4>
                <p className="text-slate-400 leading-relaxed">
                  Visualiza los días restantes para cualquier evento con claridad y motivación.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-blue-400">Gestión de tareas</h4>
                <p className="text-slate-400 leading-relaxed">
                  Crea, organiza y marca tus tareas para cumplir cada meta a tiempo.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-yellow-400">Historial de progreso</h4>
                <p className="text-slate-400 leading-relaxed">
                  Consulta tus eventos pasados y las tareas completadas para evaluar tu desempeño.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-red-400">Organización Multievento</h4>
                <p className="text-slate-400 leading-relaxed">
                  Administra múltiples eventos simultáneamente, cada uno con sus propias tareas y objetivos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Example Section */}
      <section className="relative z-10 py-24 px-6 lg:px-12 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400 bg-green-500/10">
            Vista Previa
          </Badge>
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Tu evento, siempre bajo control
          </h3>
          <p className="max-w-2xl mx-auto text-slate-400 mb-12 text-lg">
            Visualiza tu progreso con tareas, cuenta regresiva y estado actual de tus eventos.
          </p>

          <div className="relative overflow-hidden">
            <div
              className="flex animate-scroll gap-6"
              style={{
                animation: "scroll 30s linear infinite",
                width: "calc(340px * 12 + 24px * 11)",
              }}
            >
              {[...demoEvents, ...demoEvents].map((event, idx) => (
                <Card
                  key={idx}
                  className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
                  style={{ width: 340 }}
                >
                  <CardContent className="p-6 text-left h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-white">{event.title}</h4>
                        <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400 bg-blue-500/10 flex items-center gap-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.daysLeft} días
                        </Badge>
                      </div>
                      <ul className="space-y-3 text-sm">
                        {event.tasks.map((task, i) => (
                          <li key={i} className="flex items-center gap-3">
                            {task.done ? (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                            )}
                            <span
                              className={`${task.done ? "text-green-300 line-through" : "text-slate-300"} transition-colors duration-200`}
                            >
                              {task.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="relative z-10 bg-slate-900/50 backdrop-blur-sm py-24 px-6 lg:px-12 text-center" id="about">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400 bg-purple-500/10">
            Nuestra Misión
          </Badge>
          <h3 className="text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Sobre nosotros
          </h3>
          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed">
            En <span className="text-blue-400 font-semibold">Eventify</span> creemos que cada momento importante merece
            ser planificado con claridad y entusiasmo. Nuestro objetivo es ayudarte a visualizar, organizar y cumplir
            tus metas de forma efectiva. Ya sea una fiesta, un examen o un proyecto profesional, Eventify te da las
            herramientas para mantener el control y la motivación.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-3xl blur-2xl"></div>
            <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-12">
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  ¿Listo para transformar cómo gestionas tus eventos?
                </h3>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  Únete a miles de usuarios que ya organizan sus eventos de manera más eficiente
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                >
                  <Link to="/demo" className="flex items-center text-white">
                    Comienza gratis ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     {/* Footer */}
     <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Event
                  </span>
                  <span className="text-white">ify</span>
                </h1>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                La plataforma definitiva para organizar eventos y gestionar tareas de manera eficiente.
              </p>
              <div className="flex space-x-4">
                <Link to="https://github.com/Kevinherrer1/todolist-events_front" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Producto</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 m-0 text-left">
                    Características
                  </button>
                </li>
                <li>
                  <Link to="/demo" className="hover:text-white transition-colors">
                    Probar gratis
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-500">
            <p>© 2024 Eventify. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-340px * 6 - 24px * 5));
          }
        }
      `}</style>
    </div>
  )
}
