const mysql = require("mysql2/promise");

const dbConfig = {
    host: "mysql-stevenromano.alweysdata.net",
    user: "stevenromano",
    password: "Rom@no12e",
    database: "stevenromano_clientes",
};

connection.connect(err => {
    if (err) {
    console.error("Error de conexión:", err);
    } else {
    console.log("Conectado a AlwaysData");
    }
});

module.exports = connection;