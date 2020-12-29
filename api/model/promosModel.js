const pool = require("../db");

const Promos = {};


Promos.create = async (data) => {
    return await pool.query(`INSERT INTO "Promo" 
    ("anneePromo")
    VALUES ($1) RETURNING * `, [data.anneePromo])
};

Promos.delete = async (anneePromo) => {
    return await pool.query(`DELETE FROM "Promo" WHERE "anneePromo" = ${anneePromo} RETURNING *`);
};


Promos.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Promo"`);
};

module.exports = Promos;