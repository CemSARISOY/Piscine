const pool = require("../db");

const Groupe = {};

Groupe.findAll = async () => {
    return await pool.query(`SELECT * FROM "Groupe"`);
};

Groupe.findOne = async (id) => {
    return await pool.query(`SELECT * FROM "Groupe" WHERE "idGroupe" = ${ id }`);
};

Groupe.create = async (data) => {
    try{
    await pool.query("BEGIN");
    
    const groupe = await pool.query(`INSERT INTO "Groupe" 
    ("tuteurGroupe","nomTutEnt","prenomTutEnt","nomEntreprise")
    VALUES ($1,$2,$3,$4) RETURNING * `, [data.tuteurGroupe, data.nomTutEnt, data.prenomTutEnt, data.nomEntreprise])
    if(groupe.rowCount == 0) throw "Erreur de creation du groupe"
    
    for (let i=0; i<data.etudiants.length;i++)
    {
        let etudiantsData = {
            numEtudiant: data.etudiants[i].numEtudiant
        }

    const estEtudiant = await pool.query(`INSERT INTO "Composer" ("numEtudiant","idGroupe") VALUES ($1, $2) RETURNING *`, [etudiantsData.numEtudiant,groupe.idGroupe])
    if(estEtudiant.rowCount == 0) throw "Erreur lors de l'affectation des etudiants"
    }
    await pool.query("COMMIT");    
    return groupe
    
    }catch(err){
        await pool.query("ROLLBACK");
        throw err;
    }
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

Groupe.findEtudiants = async (id) => {
    return await pool.query(`SELECT * FROM "Etudiants" JOIN "Composer" ON "Etudiants"."numEtudiant" = "Composer"."numEtudiant" WHERE "idGroupe" = ${ id } RETURNING *`);
}

module.exports = Groupe;