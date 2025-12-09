# NTO Booking App

Aplicación web completa para **reservar citas de tatuajes online**, con autenticación tradicional y con **Google OAuth**, gestión de usuarios, administración de reservas y sincronización con **Google Calendar**.

La plataforma incluye:
- Frontend en React
- Backend en Node.js + Express
- Base de datos SQL (PostgreSQL)
- Integración con Google OAuth y Google Calendar API

### 👤 **Usuarios**
- Registro y login (email/contraseña)
- Login con **Google OAuth**
- Ver catálogo de tatuajes disponibles
- Reservar citas con fecha y hora
- Añadir reserva automáticamente a **Google Calendar**
- Editar perfil

### 🛠️ **Administradores**
- Dashboard de reservas
- Gestión de reservas
- Gestión completa de usuarios
- Editar perfil

---

# 🏗️ Arquitectura general

La aplicación sigue un modelo **Cliente–Servidor**:

Frontend (React)
↕ Axios
Backend API (Node.js + Express)
↕ pg
Base de Datos (PostgreSQL)
↕ OAuth2 / Calendar
Google Services

## Tecnologías utilizadas

**Backend:**
| **Node.js** | Plataforma del servidor |
| **Express** | Framework y manejo de rutas |
| **Express-session** | Gestión de sesiones |
| **Cors** | Permitir llamadas desde el frontend |
| **Multer** | Subida de imágenes y archivos |
| **Pg** | Conexión con PostgreSQL |
| **Bcryptjs** | Hash de contraseñas |
| **Jsonwebtoken (JWT)** | Autenticación con tokens |
| **Passport** | Middleware de autenticación |
| **Passport-google-oauth20** | Login con Google |
| **Swagger-jsdoc** | Documentación de API desde JSDoc |


**Frontend:**
| **React** | UI Components |
| **React-icons** | Iconografía |
| **React-datepicker** | Selector de fechas y horas |
| **Axios** | Peticiones al backend |
| **Uuid** | Generación de IDs únicos |

---
## 🗄️ Base de datos (PostgreSQL)

### Tablas principales
- **Users** → datos, rol, Google ID, autenticación
- **Tattoos** → imagen, descripción, categoría
- **Reservations** → usuario, tatuaje, fecha, hora, estado

Relaciones:
- User 1—N Reservations  
- Tattoo 1—N Reservations

---

## Estructura del proyecto

backend/
│   app.js
├── config/
│ └── db.js
│ └── googleAuth.js
│ └── jsonwebtoken.js
│ └── swagger.js
├── controllers/
│ └── auth.controller.js
│ └── tattoo.controller.js
│ └── user.controller.js
│ └── tattoo.controller.js
├── middlewares/
│ └── admin.midleware.js
│ └── auth.middleware.js
│ └── error404.js
│ └── morgan.js
│ └── upload.js
├── models/
│ └── booking.model.js
│ └── tattoo.model.js
│ └── user.model.js
│ └── queries.js
├── routes/
│ └── admin.routes.js
│ └── auth.routes.js
│ └── booking.routes.js
│ └── tattoo.routes.js
│ └── user.routes.js
├── uploads/
|
frontend/
│   index.html
├── public/
├── src/
│ └── components
│        └── Dashboard
│        └── GoogleCalendarButton
│        └── TattooCard
│        └── UsersTable
│        └── ...
│ └── layout
│        └── Main
│        └── Footer
│        └── FooterAdmin
│ └── pages
│        └── Admin
│        └── Booking
│        └── Home
│        └── Login
│        └── Profile
│        └── ...
│ └── router
│ └── services


## 📘 Documentación API (Swagger)
- http://localhost:3000/api-docs/