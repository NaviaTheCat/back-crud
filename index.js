const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 8001;

// Configurar Express para confiar en proxies (necesario para X-Forwarded-For)
app.set('trust proxy', true);

// Seguridad basica y control de trafico
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 200,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: "Demasiadas solicitudes, intenta mas tarde" }
    })
);

// Habilitar CORS
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Rutas
app.use("/items", require("./routes/items.routes"));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// app.listen(3000, () => {
//   console.log("Servidor backend corriendo en http://localhost:3000");