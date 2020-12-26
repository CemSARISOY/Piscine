const pool = require("../db");

const Professeurs = {};

//Requêtes bdd

//création
Professeurs.create = async (data) => {
    return await pool.query(`INSERT INTO "Professeurs" 
    ("nomProf","prenomProf")
    VALUES ($1,$2) RETURNING * `, [data.nomProf, data.prenomProf])
};

//selection d'un professeur depuis son id 
Professeurs.select = async (id) => {
    return await pool.query(`SELECT * FROM "Professeurs" WHERE "idProf" = ${ id }`);
};

//selection de tous les profs
Professeurs.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Professeurs"`);
};

//update 
Professeurs.update = async (id, data) => {
    return await pool.query(`UPDATE public."Professeurs" 
                                        SET "nomProf" = $1, 
                                        "prenomProf" = $2
                                        WHERE "idProf" = ${ id } RETURNING *`,[data.nomProf, data.prenomProf]); 
};


//supprime professeur
Professeurs.delete = async (id) => {
    return await pool.query(`DELETE FROM "Professeurs" WHERE "idProf" = ${ id } RETURNING *`);
};


module.exports = Professeurs;