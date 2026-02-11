const express = require("express");
const router = express.Router();
const controller = require("../controllers/items.controller");
const rateLimit = require("express-rate-limit");

const readLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 60,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: "Demasiadas solicitudes, intenta mas tarde" }
});

const writeLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: "Demasiadas solicitudes, intenta mas tarde" }
});

router.get("/", readLimiter, controller.getItems);
router.post("/", writeLimiter, controller.createItem);
router.put("/:id", writeLimiter, controller.updateItem);
router.delete("/:id", writeLimiter, controller.deleteItem);

module.exports = router;
