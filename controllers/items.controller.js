
const db = require("../models/dbConfig");
const { validationResult } = require("express-validator");

exports.getItems = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.json(results);
  });
};

exports.createItem = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre } = req.body;
  db.execute("INSERT INTO clientes (nombre) VALUES (?)", [nombre], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.sendStatus(201);
  });
};

exports.updateItem = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { nombre } = req.body;

  db.execute("UPDATE clientes SET nombre=? WHERE id=?", [nombre, id], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.sendStatus(200);
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  db.execute("DELETE FROM clientes WHERE id=?", [id], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.sendStatus(200);
  });
};
