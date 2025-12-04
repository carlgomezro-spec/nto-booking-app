const express = require("express");
const cowsay = require("cowsay");

const app = express(); // Creando el servidor
app.use(express.json());
const path = require("path");
const cors = require("cors")
// Permitir cualquier origen (para desarrollo)
app.use(cors());

// Configurar puerto con valor por defecto
const port = process.env.PORT || 3000;
// Leer fichero .env
require('dotenv').config();

// Middlewares
const error404 = require("./middlewares/error404");
// Morgan
const morgan = require("./middlewares/morgan");

// Configuración del logger con Morgan
app.use(morgan(':method :∫url :status :param[id] - :response-time ms :body'));

// Rutas
app.use("/api/users", require("./routes/user.routes"));      
app.use("/api/tattoos", require("./routes/tattoo.routes"));  
app.use("/api/bookings", require("./routes/booking.routes")); 

// Para poder acceder a las imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ruta base de comprobación
app.get('/api', (req, res) => {
  res.send('✅ Backend funcionando correctamente');
});

app.use("/api/auth", require("./routes/auth.routes"));


app.use(error404); // Manejo de rutas no encontradas

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en puerto ${port}`);
  console.log(
    cowsay.say({
      text: `Tattoo App funcionando en http://localhost:${port}/api`,
      f: "owl",
    })
  );
});
