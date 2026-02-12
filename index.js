const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 8001;

// Seguridad basica y control de trafico
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"]
        }
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

app.use(
    rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 200,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: "Demasiadas solicitudes, intenta mas tarde" }
    })
);

// Habilitar CORS con restricciones
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

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