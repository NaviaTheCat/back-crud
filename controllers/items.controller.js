const db = require("../models/dbConfig");
const { body, param, validationResult } = require("express-validator");

const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;
const isValidNombre = (nombre) => typeof nombre === "string" && nombre.trim().length > 0 && nombre.length <= 255;

exports.getItems = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ message: "Error interno" });
    res.json(results);
  });
};

exports.createItem = [
  body("nombre")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage("Nombre inválido"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre } = req.body;
    const sql = "INSERT INTO clientes (nombre) VALUES (?)";
    db.execute(sql, [nombre.trim()], (err, results) => {
      if (err) return res.status(500).json({ message: "Error interno" });
      res.status(201).json({ id: results.insertId });
    });
  }
];

exports.updateItem = [
  param("id")
    .isNumeric()
    .custom(val => isValidId(val))
    .withMessage("ID inválido"),
  body("nombre")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage("Nombre inválido"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nombre } = req.body;
    const sql = "UPDATE clientes SET nombre=? WHERE id=?";
    db.execute(sql, [nombre.trim(), id], (err, results) => {
      if (err) return res.status(500).json({ message: "Error interno" });
      if (results.affectedRows === 0) return res.status(404).json({ message: "No encontrado" });
      res.sendStatus(200);
    });
  }
];

exports.deleteItem = [
  param("id")
    .isNumeric()
    .custom(val => isValidId(val))
    .withMessage("ID inválido"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const sql = "DELETE FROM clientes WHERE id=?";
    db.execute(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: "Error interno" });
      if (results.affectedRows === 0) return res.status(404).json({ message: "No encontrado" });
      res.sendStatus(200);
    });
  }
];
