const pool = require("../db");

const Etudiants = {};

Etudiants.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Etudiants"`);
};

Etudiants.select = async (id) => {
    return await pool.query(`SELECT * FROM "Etudiants" WHERE "numEtudiant" = ${ id }`);
};

Etudiants.create = async (data) => {
    return await pool.query(`INSERT INTO "Etudiants" 
    ("numEtudiant","nomEtudiant","prenomEtudiant","mailEtudiant","mdpEtudiant","promoEtudiant")
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING * `, [data.numEtudiant, data.nomEtudiant, data.prenomEtudiant, data.mailEtudiant, data.mdpEtudiant, data.promoEtudiant])
};

Etudiants.delete = async (id) => {
    return await pool.query(`DELETE FROM "Etudiants" WHERE "numEtudiant" = ${ id } RETURNING *`);
};

Etudiants.update = async (data, id) => {
    let query = `UPDATE "Etudiants" SET `;
    for(var key in data){
        query = query + "\"" + key + "\" = '" + data[key] + "', "
    }
    query = query.slice(0, -2);
    query = query + ` WHERE "numEtudiant" = ${id} RETURNING *;`
    return await pool.query(query);
};

Etudiants.selectByPromo = async(promo) => {
    return await pool.query(`SELECT * FROM "Etudiants" WHERE "promoEtudiant" = ${promo}`);
};

Etudiants.selectEvent = async (id) => {
    const promo = await pool.query(`SELECT "promoEtudiant" FROM "Etudiants" WHERE "numEtudiant"= ${id}`);
    if(promo.rowCount == 0) throw "Erreur"
    return await pool.query(`SELECT * FROM "Evenement" WHERE "promo" = ${promo.rows[0].promoEtudiant}`);
}

module.exports = Etudiants;