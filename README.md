# 📆 Eventify - Cuenta regresiva de eventos & administrador de tareas

## 🌐📤 links de render 
- **URL Frontend:** [https://todolist-events-front.onrender.com](https://todolist-events-front.onrender.com)
- **URL Backend:** [https://todolist-events-backend.onrender.com](https://todolist-events-backend.onrender.com)

## 💡 Idea

**Eventify** es una aplicación web moderna y responsiva para **crear eventos con cuenta regresiva** y asignar **tareas** relacionadas a cada evento. Pensado para estudiantes, profesionales o cualquier persona que necesita mantener sus actividades organizadas.

---

## ✨ Características

### 🎯 Funcionalidades principales

- ✅ Crear eventos con nombre, descripción y fecha
- ✅ Ver cuántos días faltan para cada evento
- ✅ Crear tareas por evento y marcarlas como completadas
- ✅ Ver tareas agrupadas por evento (expansible)
- ✅ Buscar eventos por título
- ✅ Historial visual de eventos pasados

### 📱 Experiencia de usuario

- 🎨 Interfaz moderna y oscura con colores vivos
- 📱 Completamente responsivo para móvil, tablet y escritorio
- ⚡ Animaciones suaves y componentes intuitivos
- 🧩 Visualización clara del estado de cada evento y sus tareas

  ## 🤖 Uso de IA

Este proyecto fue apoyado por herramientas de Inteligencia Artificial para agilizar el proceso de desarrollo y mejorar la calidad del resultado final:

- **ChatGPT (OpenAI):** Asistencia en la generación de código para frontend (React + Vite) y backend (NestJS), así como validaciones, rutas y lógica CRUD.
- **Sugerencias de diseño:** Uso de IA para definir el tono visual de la landing page y estructura del dashboard, orientado a una interfaz moderna y funcional.
- **Refactorización de código:** Sugerencias para mejorar la estructura, legibilidad y buenas prácticas tanto en React como en NestJS.
- **Optimización UX:** Recomendaciones sobre organización visual, títulos persuasivos, textos motivacionales en el dashboard y estructura de secciones.

> 🧠 Aunque no se integró IA en la lógica funcional del sistema, se utilizó como soporte para acelerar el desarrollo, planificar mejor las funcionalidades, y mejorar la experiencia de usuario en general.

---

## 🛠️ Características técnicas

### 🔧 Tecnologías

#### Frontend

- Framework: React 18 + Vite
- Lenguaje: JavaScript
- Estilos: TailwindCSS
- Ruteo: React Router DOM
- Cliente HTTP: Axios
- Animaciones: `react-fast-marquee`, botones con `shadcn/ui`

#### Backend

- Framework: NestJS 10+
- Lenguaje: TypeScript
- ORM: TypeORM
- Base de datos: PostgreSQL
- Validaciones: class-validator
- CORS habilitado para frontend

#### Base de Datos

- Sistema: PostgreSQL
- Hosting: Render PostgreSQL
- Entidades: Events, Tasks

---

## 🚀 Instrucciones para ejecutar localmente

### 1. Clona el repositorio


```bash
https://github.com/Kevinherrer1/todolist-events_front.git
```

### 2. Configura la base de datos

Asegúrate de tener PostgreSQL corriendo.

instala PostgreSQL localmente y crea la base de datos `todolist-events`.

### 3. Backend

```bash
 cd todolist-events_backend
pnpm install
# o npm install

# Configura las variables de entorno en .env
cp .env.example .env
# Edita .env con tus credenciales de base de datos

pnpm start:dev
# o npm run start:dev
```

El backend corre por defecto en [http://localhost:3000](http://localhost:3000).

### 4. Frontend

```bash
cd todolist-events_front
pnpm install
# o npm install

pnpm dev
# o npm run dev
```

El frontend corre por defecto en [http://localhost:5173/](http://localhost:5173/).

### 5. ¡Listo!

- Abre [http://localhost:5173](http://localhost:5173) en tu navegador  
- Crea eventos, asígnales tareas y visualiza la cuenta regresiva  
- Marca las tareas como completadas a medida que avances  
- Explora el dashboard desde tu móvil, tablet o escritorio: es completamente responsivo


## ☁️ Despliegue en Render

### Configuración actual

El proyecto está desplegado en Render con la siguiente configuración:

#### Backend (Web Service)
- **URL:** [https://todolist-events-backend.onrender.com](https://todolist-events-backend.onrender.com)
- **Build Command:** `cd backend && npm install && npm run build`
- **Start Command:** `cd backend && npm run start:prod`
- **Variables de entorno:**
  ```env
  DATABASE_HOST=dpg-d1gq8c7fte5s73902360-a
  DATABASE_NAME=eventify_postgres
  DATABASE_PASSWORD=6RwFKtJUBW2lGYl6XywI7vDsJttvQHI8
  DATABASE_PORT=5432
  DATABASE_USER=eventify_postgres_user
  ```

#### Frontend Web Service
- **URL:** [https://todolist-events-front.onrender.com](https://todolist-events-front.onrender.com)
- **Build Command:** `cd frontend && npm install && npm run build`
- **Variables de entorno:**
  ```env
  VITE_API_URL=https://todolist-events-backend.onrender.com
  ```

### Para replicar el despliegue

#### 1. Base de datos PostgreSQL
1. Crea una base de datos PostgreSQL en Render
2. Anota las credenciales de conexión

#### 2. Backend
1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Crea un nuevo **Web Service**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm run start:prod`
   - **Variables de entorno:** Configura las credenciales de tu base de datos

#### 3. Frontend
1. Crea un nuevo **Web Service** en Render
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Variable de entorno:** `NEXT_PUBLIC_API_URL` apuntando a tu backend


## 🔧 Estructura del proyecto

```
todolist-events/
├── todolist-events_front/           # Aplicación React + Vite
│   ├── src/
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── ui/                  # Componentes de UI base
│   │   │   │   ├── button.jsx       # Botones personalizados
│   │   │   │   ├── card.jsx         # Cards con estilos
│   │   │   │   ├── input.jsx        # Inputs estilizados
│   │   │   │   ├── textarea.jsx     # Textareas personalizados
│   │   │   │   ├── checkbox.jsx     # Checkboxes estilizados
│   │   │   │   └── badge.jsx        # Badges informativos
│   │   │   ├── LandingPage.jsx      # Página de inicio
│   │   │   ├── EventList.jsx        # Lista de eventos y tareas
│   │   │   └── ApiTest.jsx          # Componente de pruebas API
│   │   ├── services/
│   │   │   └── api.js               # Servicios de API
│   │   ├── assets/                  # Recursos estáticos
│   │   │   └── react.svg
│   │   ├── App.jsx                  # Componente principal
│   │   ├── App.css                  # Estilos globales
│   │   ├── index.css                # Estilos base con Tailwind
│   │   └── main.jsx                 # Punto de entrada
│   ├── public/                      # Archivos públicos
│   │   ├── calendario.png           # Imagen del calendario
│   │   ├── create-event-landing.jpg # Imagen principal
│   │   └── vite.svg                 # Logo de Vite
│   ├── package.json                 # Dependencias frontend
│   ├── vite.config.js               # Configuración de Vite
│   ├── tailwind.config.js           # Configuración de Tailwind
│   └── index.html                   # HTML base
├── todolist-events_backend/         # API NestJS
│   ├── src/
│   │   ├── event.entity.ts          # Entidad de eventos
│   │   ├── task.entity.ts           # Entidad de tareas
│   │   ├── app.controller.ts        # Controlador principal
│   │   ├── app.service.ts           # Servicios de negocio
│   │   ├── app.module.ts            # Módulo principal
│   │   └── main.ts                  # Punto de entrada
│   ├── test/                        # Tests
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── package.json                 # Dependencias backend
│   ├── tsconfig.json                # Configuración TypeScript
│   └── nest-cli.json                # Configuración NestJS
└── README.md                        # Documentación del proyecto
```


##🎯 Endpoints de la API - Eventify
Base URL: https://todolist-events-backend.onrender.com
🏠 Información General
- `GET /` - Página de bienvenida HTML
- `GET /api/saludo` - Saludo JSON del backend
- `GET /test` - Test de conexión entre frontend y backend
📅 Eventos
- `GET /events` - Obtener todos los eventos con sus tareas
- `POST /events` - Crear nuevo evento
- `DELETE /events/:eventId` - Eliminar evento por ID
✅ Tareas
- `GET /events/:eventId/tasks` - Obtener todas las tareas de un evento
- `POST /events/:eventId/tasks` - Crear nueva tarea en un evento
- `PATCH /events/:eventId/tasks/:taskId` - Actualizar tarea específica


## 👤 Autor

**Kevin Herrera**

- **GitHub:** [@Kevinherrer1](https://github.com/Kevinherrer1)
- **Proyecto:** Eventify
- **Tecnologías:**NestJS, TypeScript, PostgreSQL

---





