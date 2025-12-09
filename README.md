# NTO Booking App

Aplicación web para reservar tatuajes online. Permite a los usuarios ver tatuajes, registrarse, iniciar sesión y reservar citas. Los administradores pueden gestionar reservas y consultar todas las reservas.

---

## Tecnologías utilizadas

**Backend:**
- Node.js + Express  
- PostgreSQL  
- JWT para autenticación  
- dotenv para configuración de entorno  

**Frontend:**
- React  
- React Router  
- Axios para llamadas a API  
- CSS personalizado  

---

## Estructura del proyecto

backend/
│   app.js
│   server.js
│
├── controllers/
│   └── booking.controller.js
├── middlewares/
│   └── auth.middleware.js
│   └── admin.middleware.js
├── models/
│   └── booking.model.js
├── routes/
│   └── booking.routes.js
│   └── tattoo.routes.js
├── config/
│   └── jsonwebtoken.js
└── ...
frontend/
│   src/
│       Booking/
│           Booking.jsx
│           Booking.css
│       App.jsx
│       AppRouter.jsx
│       main.jsx
└── ...

## Funcionalidades
- Usuarios
- Registro e inicio de sesión (JWT)
- Ver tatuajes
- Reservar tatuajes (fecha y hora)
- Ver su perfil con reservas
- Administradores
- Listar todas las reservas
- Actualizar y eliminar reservas