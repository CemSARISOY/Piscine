const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Etudiants = require("../model/etudiantsModel");

exports.getAllEtudiant = async (req, res) => {
    try{
        const etudiants = await Etudiants.selectAll()
        if(etudiants.rowCount > 0){
            res.status(200).json(etudiants.rows);
        }else{
            res.status(404).json({message : "Il n'existe aucun étudiant"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getOneEtudiant = async (req, res) => {
    try{
        const etudiant = await Etudiants.select(req.params.id)
        if(etudiant.rowCount == 1){
            res.status(200).json(etudiant.rows[0])
        }else{
            res.status(404).json({message : "Il n'existe aucun étudiant avec ce numéro"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.createEtudiant = async (req, res) => {
    try{
        let data = req.body;
        data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
        const result = await Etudiants.create(data);
        if(result.rowCount == 1){
            res.status(201).json(result.rows[0])
        }else{
            res.status(404).json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteEtudiant = async (req, res) => {
    try{
        const result = await Etudiants.delete(req.params.id);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(400).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
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
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.login = async (req, res) =>{
    try{
        const etudiant = await Etudiants.select(req.body.numEtudiant);
        if(etudiant.rowCount == 1){
            const result = await bcrypt.compare(req.body.mdpEtudiant, etudiant.rows[0].mdpEtudiant);
            if(result){
                res.status(200).json({
                    numEtudiant: req.body.numEtudiant, 
                    token: jwt.sign(
                    { userId: req.body.numEtudiant },
                    process.env.RANDOMSECRETTOKEN,
                    { expiresIn: '20h' }
                )});
            }else{
                res.status(401).json({message: "Mot de passe incorrect"});
            }
        }else{
            res.status(404).json({message : "Aucun étudiant inscrit avec ce numéro"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
}