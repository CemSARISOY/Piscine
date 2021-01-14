const pool = require("../db");

const Creneaux = {};

Creneaux.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Creneau"`);
};

Creneaux.selectOne = async (idCreneau) => {
    return await pool.query(`SELECT * FROM "Creneau" WHERE "idCreneau" = ${ idCreneau }`);
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

Creneaux.selectJurys = async (id) => {
    return await pool.query(`SELECT "Professeurs"."idProf", "nomProf", "prenomProf" FROM "Professeurs" JOIN "Participer" ON "Professeurs"."idProf" = "Participer"."idProf" WHERE "idCreneau" = ${id}`)
}

Creneaux.deleteJury = async (idC, idP) => {
    return await pool.query(`DELETE FROM "Participer" WHERE "idProf" = ${idP} AND "idCreneau" = ${idC} RETURNING * `)
}

Creneaux.setJurys = async (idC, data) => {
    try{
        await pool.query("BEGIN");
        let list = []
        for (let i ; i<data.length ; i++){
            let result = await pool.query(`INSERT INTO "Participer" ("idProf", "idCreneau") VALUES (${data[i]}, ${idC}) RETURNING * `)
            list.push(result)
        }
        await pool.query("COMMIT");
        if(data.length != list.length) throw "Tous les jurys n'ont pas été affecté, annulation"
        return list
    }catch(err){
        await pool.query("ROLLBACK")
        throw err
    }
}

module.exports = Creneaux;