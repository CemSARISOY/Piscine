const bcrypt = require("bcrypt");
const Etudiants = require("../model/etudiantsModel");

exports.getAllEtudiant = async (req, res) => {
    try{
        const etudiants = await Etudiants.selectAll()
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
        const etudiant = await Etudiants.select(req.params.id)
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
        let data = req.body;
        data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
        const result = await Etudiants.create(data);
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
        const result = await Etudiants.delete(req.params.id);
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
        const foo = await Etudiants.select(req.params.id);
        let data = foo.rows[0]
        for(var key in data){
            if(req.body.hasOwnProperty(key)){
                data[key] = req.body[key]
            }
        }
        data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
        const result = await Etudiants.update(data);
        if(result.rowCount == 1){
            res.json(result.rows[0])
        }else{
            res.json({message : "Erreur de modification"});
        }
    }catch(err){
        res.json({message : err.message});
    }
};

exports.login = async (req, res) =>{
    try{
        const etudiant = await Etudiants.select(req.body.numEtudiant);
        if(etudiant.rowCount == 1){
            const result = await bcrypt.compare(req.body.mdpEtudiant, etudiant.rows[0].mdpEtudiant);
            if(result){
                res.json({numEtudiant: req.body.numEtudiant, token: "TOKENTODO"});
            }else{
                res.json({message: "Mot de passe incorrect"});
            }
        }else{
            res.json({message : "Aucun étudiant inscrit avec ce numéro"});
        }
    }catch(err){
        res.json({message : err.message});
    }
}