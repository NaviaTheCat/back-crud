
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const itemsRoutes = require("./routes/items.routes");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(cors({
  origin: "https://crud-clientes-production-cec1.up.railway.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use("/items", itemsRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log("Server running on port " + PORT));
