const pool = require("../db");

const Creneaux = {};

Creneaux.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Creneau"`);
};

Creneaux.selectOne = async (idCreneau) => {
    return await pool.query(`SELECT * FROM "Creneau" WHERE "idCreneau" = ${ idCreneau }`);
};

Creneaux.selectByEvent = async (idEvent) => {
    return await pool.query(`SELECT * FROM "Creneau" WHERE "idEvent" = ${ idEvent }`);
};

Creneaux.create = async (data) => {
    return await pool.query(`INSERT INTO "Creneau" 
    ("date","heureDebut","salle","idEvent")
    VALUES ($1,$2,$3,$4) RETURNING * `, [data.date, data.heureDebut, data.salle, data.idEvent])
};

Creneaux.delete = async (id) => {
    return await pool.query(`DELETE FROM "Creneau" WHERE "idCreneau" = ${ id } RETURNING *`);
};

Creneaux.update = async (data, id) => {
    let query = `UPDATE "Creneau" SET `;
    for(var key in data){
        query = query + "\"" + key + "\" = '" + data[key] + "', "
    }
    query = query.slice(0, -2);
    query = query + ` WHERE "idCreneau" = ${id} RETURNING *;`
    return await pool.query(query);
};

// Creneaux.reserver = async(id) => {
//     return await pool.query(`UPDATE "Creneau" SET "idGroupe" = 50 WHERE "idCreneau" = ${id}`);
// };

// Creneaux.annulerRes = async(id) => {
//     return await pool.query(`UPDATE "Creneau" SET "idGroupe" = 0 WHERE "idCreneau" = ${id}`);
// };


module.exports = Creneaux;