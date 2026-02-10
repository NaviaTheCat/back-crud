const mysql = require("mysql2/promise");

const dbConfig = {
    host: "",
    user: "",
    password: "",
    database: "",
};

const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

module.exports = { dbConfig, getConnection };