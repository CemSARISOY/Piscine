const pool = require("../db");

const Professeurs = {};

//Requêtes bdd

//création
Professeurs.create = async (data) => {
    return await pool.query(`INSERT INTO "Prof" 
    ("idprof","nomprof","prenomprof")
    VALUES ($1,$2,$3) RETURNING * `, [data.idprof, data.nomprof, data.prenomprof])
};

//selection d'un professeur depuis son id 
Professeurs.select = async (id) => {
    return await pool.query(`SELECT * FROM "Prof" WHERE "idprof" = ${ id }`);
};

//selection de tous les profs
Professeurs.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Prof"`);
};

//supprime professeur
Professeurs.delete = async (id) => {
    return await pool.query(`DELETE FROM "Prof" WHERE "idprof" = ${ id } RETURNING *`);
};