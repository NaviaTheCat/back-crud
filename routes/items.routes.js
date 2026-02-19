
const express = require("express");
const router = express.Router();
const controller = require("../controllers/items.controller");
const apiKey = require("../middlewares/apiKey.middleware");
const { body, param } = require("express-validator");

router.get("/", apiKey, controller.getItems);

router.post(
  "/",
  apiKey,
  body("nombre").isString().trim().isLength({ min: 2, max: 100 }),
  controller.createItem
);

router.put(
  "/:id",
  apiKey,
  param("id").isInt(),
  body("nombre").isString().trim().isLength({ min: 2, max: 100 }),
  controller.updateItem
);

router.delete(
  "/:id",
  apiKey,
  param("id").isInt(),
  controller.deleteItem
);

module.exports = router;
