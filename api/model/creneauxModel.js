const pool = require("../db");

const Creneaux = {};

Creneaux.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Creneau"`);
};

Creneaux.selectByEvent = async (idEvent) => {
    return await pool.query(`SELECT * FROM "Creneau" WHERE "idEvent" = ${ idEvent }`);
};

Creneaux.create = async (data) => {
    return await pool.query(`INSERT INTO "Creneau" 
    ("idCreneau","date","heureDebut","salle","idGroupe","idEvent")
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING * `, [data.idCreneau, data.date, data.heureDebut, data.salle, 0, data.idEvent])
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

Creneaux.reserver = async(id) => {
    return await pool.query(`UPDATE "Creneau" SET "idGroupe" = 50 WHERE "idCreneau" = ${id}`);
};

Creneaux.annulerRes = async(id) => {
    return await pool.query(`UPDATE "Creneau" SET "idGroupe" = 0 WHERE "idCreneau" = ${id}`);
};


module.exports = Creneaux;