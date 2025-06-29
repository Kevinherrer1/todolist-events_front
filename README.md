# 📆 Eventify - Cuenta regresiva de eventos & administrador de tareas

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





