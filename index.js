const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Habilitar CORS
app.use(cors());

// Rutas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});