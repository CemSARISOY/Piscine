const pool = require("../db");
const bcrypt = require("bcrypt")


exports.getAllEtudiant = async (req, res) => {
    try{
        const etudiants = await pool.query(`SELECT * FROM public."Etudiants"`);
        if(etudiants.rowCount > 0){
            res.json(etudiants.rows);
        }else{
            res.json({message : "Il n'existe aucun étudiant"});
        }
    }catch(err){
        res.json({message : err.message});
    }
};

exports.getOneEtudiant = async (req, res) => {
    try{
        const etudiant = await pool.query(`SELECT * FROM public."Etudiants" WHERE "numEtudiant" = ${ req.params.id }`);
        if(etudiant.rowCount == 1){
            res.json(etudiant.rows[0])
        }else{
            res.json({message : "Il n'existe aucun étudiant avec ce numéro"});
        }
    }catch(err){
        res.json({message : err.message});
    }
};

exports.createEtudiant = async (req, res) => {
    try{
        cryptedPassword = await bcrypt.hash(req.body.mdpEtudiant, 10)
        const result = await pool.query(`INSERT INTO public."Etudiants" 
                                        ("numEtudiant","nomEtudiant","prenomEtudiant","mailEtudiant","mdpEtudiant","promoEtudiant")
                                        VALUES (
                                            ${req.body.numEtudiant},
                                            '${req.body.nomEtudiant}',
                                            '${req.body.prenomEtudiant}',
                                            '${req.body.mailEtudiant}',
                                            '${cryptedPassword}',
                                            ${req.body.promoEtudiant}) RETURNING * `);
        
        if(result.rowCount == 1){
            res.json(result.rows[0])
        }else{
            res.json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.json({message : err.message});
    }
};

exports.deleteEtudiant = async (req, res) => {
    try{
        const result = await pool.query(`DELETE FROM public."Etudiants" WHERE "numEtudiant" = ${ req.params.id } RETURNING *`);
        if(result.rowCount == 1){
            res.json(result.rows[0]);
        }else{
            res.json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.json({message : err.message});
    }
};

exports.updateEtudiant = async (req, res) => {
    try{
        cryptedPassword = req.body.mdpEtudiant // TODO
        const result = await pool.query(`UPDATE public."Etudiants" 
                                        SET "nomEtudiant" = '${req.body.nomEtudiant}', 
                                        "prenomEtudiant" = '${req.body.prenomEtudiant}',
                                        "mailEtudiant" = '${req.body.mailEtudiant}',
                                        "mdpEtudiant" = '${cryptedPassword}',
                                        "promoEtudiant" = ${req.body.promoEtudiant} 
                                        WHERE "numEtudiant" = ${ req.params.id } RETURNING *`);
        if(result.rowCount == 1){
            res.json(result.rows[0])
        }else{
            res.json({message : "Erreur de modification"});
        }
    }catch(err){
        res.json({message : err.message});
    }
};