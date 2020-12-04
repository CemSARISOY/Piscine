const Groupe = require("../model/groupeModel");

exports.getAllGroupe = async (req, res) => {
    try{
        const groupe = await Groupe.findAll()
        if(groupe.rowCount > 0){
            res.status(200).json(groupe.rows);
        }else{
            res.status(404).json({message : "Il n'existe aucun groupe"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getOneGroupe = async (req, res) => {
    try{
        const groupe = await Groupe.findOne(req.params.id)
        if(groupe.rowCount == 1){
            res.status(200).json(groupe.rows[0])
        }else{
            res.status(404).json({message : "Il n'existe aucun groupe avec cet id"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.createGroupe = async (req, res) => {
    try{
        let data = req.body;
        const result = await Groupe.create(data);
        if(result.rowCount == 1){
            res.status(201).json(result.rows[0])
        }else{
            res.status(404).json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteGroupe = async (req, res) => {
    try{
        const result = await Groupe.delete(req.params.id);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(400).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.updateGroupe = async (req, res) => {
    try{
        let data = req.body
        const result = await Groupe.update(data, req.params.id);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

