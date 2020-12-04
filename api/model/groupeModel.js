const pool = require("../db");

const Groupe = {};

Groupe.findAll = async () => {
    return await pool.query(`SELECT * FROM "Groupe"`);
};

Groupe.findOne = async (id) => {
    return await pool.query(`SELECT * FROM "Groupe" WHERE "idGroupe" = ${ id }`);
};

Groupe.create = async (data) => {
    return await pool.query(`INSERT INTO "Groupe" 
    ("idGroupe","tuteurGroupe","nomTutEnt","prenomTutEnt","nomEntreprise")
    VALUES ($1,$2,$3,$4,$5) RETURNING * `, [data.idGroupe, data.tuteurGroupe, data.nomTutEnt, data.prenomTutEnt, data.nomEntreprise])
};

Groupe.delete = async (id) => {
    return await pool.query(`DELETE FROM "Groupe" WHERE "idGroupe" = ${ id } RETURNING *`);
};

Groupe.update = async (data, id) => {
    let query = `UPDATE "Groupe" SET `;
    for(var key in data){
        query = query + "\"" + key + "\" = '" + data[key] + "', "
    }
    query = query.slice(0, -2);
    query = query + ` WHERE "idGroupe" = ${id} RETURNING *;`
    return await pool.query(query);
};

module.exports = Groupe;