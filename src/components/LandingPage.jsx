import React from "react";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Marquee from 'react-fast-marquee';
import { useNavigate } from "react-router-dom";

const demoEvents = [
  {
    title: "🎉 Lanzamiento del Proyecto — Faltan 12 días",
    tasks: [
      { done: true, text: "Preparar presentación" },
      { done: false, text: "Agendar reunión con equipo" },
      { done: false, text: "Publicar en redes" },
    ],
  },
  {
    title: "🎂 Cumpleaños de Mamá — Faltan 5 días",
    tasks: [
      { done: true, text: "Comprar regalo" },
      { done: false, text: "Reservar restaurante" },
      { done: false, text: "Enviar invitaciones" },
    ],
  },
  {
    title: "🏆 Torneo de fútbol — Faltan 20 días",
    tasks: [
      { done: false, text: "Inscribir equipo" },
      { done: false, text: "Comprar uniformes" },
      { done: false, text: "Practicar jugadas" },
    ],
  },
  {
    title: "🎓 Examen final — Faltan 3 días",
    tasks: [
      { done: true, text: "Revisar apuntes" },
      { done: false, text: "Resolver ejercicios" },
      { done: false, text: "Dormir bien" },
    ],
  },
  {
    title: "🎤 Conferencia Tech — Faltan 30 días",
    tasks: [
      { done: false, text: "Preparar diapositivas" },
      { done: false, text: "Confirmar asistentes" },
      { done: false, text: "Revisar equipo" },
    ],
  },
  {
    title: "🎮 Game Jam — Faltan 7 días",
    tasks: [
      { done: false, text: "Formar equipo" },
      { done: false, text: "Definir idea" },
      { done: false, text: "Preparar assets" },
    ],
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">
          <span className="text-blue-400">Event</span>ify
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-green-400 transition-transform duration-200 hover:scale-105 inline-block">Características</a>
          <a href="#demo" className="hover:text-green-400 transition-transform duration-200 hover:scale-105 inline-block" onClick={() => navigate('/demo')}>probar gratis</a>
          <a
            href="#about"
            className="hover:text-green-400 transition-transform duration-200 hover:scale-105 inline-block"
            onClick={e => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            acerca de nosotros
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-20 px-12 py-38 min-h-[78vh]">
        <div className="max-w-2xl flex-1">
          <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-8">
            Organiza <span className="text-green-400">eventos</span>,<br />cumple tus <span className="text-blue-400">tareas</span>.
          </h2>
          <p className="text-gray-300 mt-4 text-2xl mb-10">
           Crea eventos con cuenta regresiva y gestión de tareas, perfecto para todo tipo de planes.
          </p>
          <div className="mt-6 space-x-4">
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg px-8 py-3 transition-transform duration-200 hover:scale-105">Explorar características</Button>
            <Button variant="outline" className="text-white text-lg px-8 py-3 transition-transform duration-200 hover:scale-105" onClick={() => navigate('/demo')}>Probar Gratis</Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[340px] h-[520px] lg:w-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center animate-floatY">
            <img
              src="/create-event-landing.jpg"
              alt="Create an Event Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
      

      {/* Beneficios */}
      <section className="bg-[#151518] py-20 px-8" id="features">
        <h3 className="text-3xl font-bold text-center mb-12">Descubre todo lo que puedes lograr</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="relative group bg-[#1e1e22] p-6 rounded-xl shadow border border-transparent transition-all duration-200 hover:scale-105 hover:border-cyan-400 cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-cyan-400 to-green-400 opacity-40 group-hover:opacity-100 transition-all duration-200" />
            <h4 className="text-lg font-semibold mb-2 text-green-400 relative z-10">Cuenta regresiva</h4>
            <p className="text-sm text-gray-400 relative z-10">Visualiza los días restantes para cualquier evento con claridad y motivación.</p>
          </div>
          <div className="relative group bg-[#1e1e22] p-6 rounded-xl shadow border border-transparent transition-all duration-200 hover:scale-105 hover:border-cyan-400 cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-cyan-400 to-green-400 opacity-40 group-hover:opacity-100 transition-all duration-200" />
            <h4 className="text-lg font-semibold mb-2 text-blue-400 relative z-10">Gestión de tareas</h4>
            <p className="text-sm text-gray-400 relative z-10">Crea, organiza y marca tus tareas para cumplir cada meta a tiempo.</p>
          </div>
          <div className="relative group bg-[#1e1e22] p-6 rounded-xl shadow border border-transparent transition-all duration-200 hover:scale-105 hover:border-cyan-400 cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-cyan-400 to-green-400 opacity-40 group-hover:opacity-100 transition-all duration-200" />
            <h4 className="text-lg font-semibold mb-2 text-yellow-400 relative z-10">Historial de progreso</h4>
            <p className="text-sm text-gray-400 relative z-10">Consulta tus eventos pasados y las tareas que lograste completar para evaluar tu desempeño.</p>
          </div>
          <div className="relative group bg-[#1e1e22] p-6 rounded-xl shadow border border-transparent transition-all duration-200 hover:scale-105 hover:border-cyan-400 cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-cyan-400 to-green-400 opacity-40 group-hover:opacity-100 transition-all duration-200" />
            <h4 className="text-lg font-semibold mb-2 text-red-400 relative z-10">Organización Multievento</h4>
            <p className="text-sm text-gray-400 relative z-10"> Administra múltiples eventos al mismo tiempo, cada uno con sus propias tareas, fechas y objetivos.</p>
          </div>
        </div>
      </section>

      {/* Visual Example Section con Swiper tipo marquee */}
      <section className="bg-[#0e0e10] py-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-6">Tu evento, siempre bajo control</h3>
        <p className="max-w-2xl mx-auto text-gray-400 mb-10">
          Visualiza tu progreso con tareas, cuenta regresiva y estado actual de tus eventos.
        </p>
        <div className="max-w-6xl mx-auto">
          <Marquee gradient={false} speed={20} pauseOnHover={true}>
            {demoEvents.concat(demoEvents).concat(demoEvents).concat(demoEvents).map((event, idx) => (
              <div
                key={idx}
                className="bg-[#1e1e22] rounded-xl p-6 text-left shadow-lg min-h-[220px] flex flex-col justify-between mx-4"
                style={{ width: 340, flexShrink: 0 }}
              >
                <h4 className="text-lg font-bold mb-3">{event.title}</h4>
                <ul className="space-y-2 text-sm">
                  {event.tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {task.done ? (
                        <span className="text-green-400 text-lg">&#10003;</span>
                      ) : (
                        <span className="text-white text-lg">&#9633;</span>
                      )}
                      <span className={task.done ? "text-green-300" : ""}>{task.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-[#151518] py-20 px-8 text-center" id="about">
        <h3 className="text-3xl font-bold mb-6">Sobre nosotros</h3>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          En Eventify creemos que cada momento importante merece ser planificado con claridad y entusiasmo. Nuestro objetivo es ayudarte a visualizar, organizar y cumplir tus metas de forma efectiva. Ya sea una fiesta, un examen o un proyecto profesional, Eventify te da las herramientas para mantener el control y la motivación.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#151518] text-center">
        <h3 className="text-2xl font-bold mb-4">
          ¿Listo para transformar cómo gestionas tus eventos?
        </h3>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 mt-2 transition-transform duration-200 hover:scale-105" onClick={() => navigate('/demo')}>
          Comienza gratis ahora
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800 text-sm text-center text-gray-500 bg-[#0e0e10]">
        <p>
          Hecho con 💙 por <span className="text-white font-medium">Eventify</span> ·
          <a href="#" className="underline ml-1 transition-transform duration-200 hover:scale-105 inline-block">GitHub</a> ·
          <a href="#" className="underline ml-1 transition-transform duration-200 hover:scale-105 inline-block">Contacto</a>
        </p>
      </footer>
    </div>
  );
} 