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

Etudiants.update = async (data) => {
    return await pool.query(`UPDATE public."Etudiants" 
                                        SET "nomEtudiant" = $2, 
                                        "prenomEtudiant" = $3,
                                        "mailEtudiant" = $4,
                                        "mdpEtudiant" = $5,
                                        "promoEtudiant" = $6 
                                        WHERE "numEtudiant" = $1 RETURNING *`, [data.numEtudiant, data.nomEtudiant, data.prenomEtudiant, data.mailEtudiant, data.mdpEtudiant, data.promoEtudiant]);
}


module.exports = Etudiants;