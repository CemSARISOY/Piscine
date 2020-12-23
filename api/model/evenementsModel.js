const pool = require("../db");

const Evenements = {};

Evenements.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Evenement"`);
};

Evenements.select = async (id) => {
    return await pool.query(`SELECT * FROM "Evenement" WHERE "numEvenement" = ${id}`);
};

Evenements.create = async (data) => {
    return await pool.query(`INSERT INTO "Evenement" ("promo", "nomEvenement", "dateDebut", "duree", "dateLimiteRes", "dureeCreneau") 
                            VALUES ($1, $2, $3 ,$4, $5, $6) RETURNING *`, [data.promo, data.nomEvenement, data.dateDebut, data.duree, data.dateLimiteRes, data.dureeCreneau]);
}

Evenements.delete = async (id) => {
    return await pool.query(`DELETE FROM "Evenement" WHERE "numEvenement" = ${ id } RETURNING *`);
}

module.exports = Evenements;