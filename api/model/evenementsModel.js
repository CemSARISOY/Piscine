const pool = require("../db");

const Evenements = {};

Evenements.selectAll = async () => {
    return await pool.query(`SELECT * FROM "Evenement"`);
};

Evenements.select = async (id) => {
    return await pool.query(`SELECT * FROM "Evenement" WHERE "numEvenement" = ${id}`);
};

Evenements.getCreneaux = async (id) => {
    return await pool.query(`SELECT * FROM "Creneau" WHERE "idEvent" = ${ id }`);
};

// On créé l'evenement et les créneaux associés et on affecte les jurys
Evenements.create = async (data) => {
    try{
        await pool.query("BEGIN");
        const event = await pool.query(`INSERT INTO "Evenement" ("promo", "nomEvenement", "dateDebut", "duree", "dateLimiteRes", "dureeCreneau") 
        VALUES ($1, $2, $3 ,$4, $5, $6) RETURNING *`, [data.promo, data.nomEvenement, data.dateDebut, data.duree, data.dateLimiteRes, data.dureeCreneau]);
        console.log("passed1")
        if(event.rowCount == 0) throw "Erreur création de l'événement";

        for (let i=0; i<data.creneaux.length;i++)
        {
            let creneauxData = {
                date: data.creneaux[i].date,
                heure: data.creneaux[i].heure,
                salle: data.creneaux[i].salle,
                idEvent: event.rows[0].numEvenement
            };
            const creneau = await pool.query(`INSERT INTO "Creneau" ("date","heureDebut","salle","idEvent") VALUES($1,$2,$3,$4) RETURNING *`
            , [creneauxData.date, creneauxData.heure, creneauxData.salle, creneauxData.idEvent]);

            if(creneau.rowCount == 0) throw "Erreur création du créneau";
        }

        await pool.query("COMMIT");
        return event;

    }catch(err){
        await pool.query("ROLLBACK");
        throw err;
    }
}

// La clé étrangère des créneaux est en cascade, donc supprimer l'event supprimera aussi les créneaux et donc les affectations de jury
Evenements.delete = async (id) => {
    return await pool.query(`DELETE FROM "Evenement" WHERE "numEvenement" = ${ id } RETURNING *`);
}


Evenements.update = async (data, id) => {
    let query = `UPDATE "Evenement" SET `;
    for(var key in data){
        query = query + "\"" + key + "\" = '" + data[key] + "', "
    }
    query = query.slice(0, -2);
    query = query + ` WHERE "numEvenement" = ${id} RETURNING *;`
    return await pool.query(query);
};


module.exports = Evenements;