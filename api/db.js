const Pool = require("pg").Pool;

const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_DB
});

module.exports = pool;