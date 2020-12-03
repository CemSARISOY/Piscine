const bcrypt = require("bcrypt"); //Pour hash les mdp
const Professeurs = require("../model/professeursModel");

//CRUD
//create prof
exports.createProfesseur = async (req, res) => {
    try{
        let data = req.body;
        data.mdpProfesseur = await bcrypt.hash(data.mdpProfesseur, 10)
        const result = await Professeurs.create(data);
        if(result.rowCount == 1){
            res.status(201).json(result.rows[0])
        }else{
            res.status(404).json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};



//get prof
exports.getOneProfesseur = async (req, res) => {
    try{
        const professeur = await Professeurs.select(req.params.id)
        if(professeur.rowCount == 1){
            res.status(200).json(professeur.rows[0])
        }else{
            res.status(404).json({message : "Il n'existe aucun professeur avec cet id"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};


//recupère de tous les profs
exports.getAllProf = async (req, res) => {
    try{
        const professeurs = await Professeurs.selectAll()
        if(professeurs.rowCount > 0){
            res.status(200).json(professeurs.rows);
        }else{
            res.status(404).json({message : "Il n'y a aucun professeur"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};


//supprime prof
exports.deleteProfesseur = async (req, res) => {
    try{
        const result = await Professeurs.delete(req.params.id);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(400).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};