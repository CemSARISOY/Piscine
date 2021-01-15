const Creneaux = require("../model/creneauxModel");

exports.getAllCreneaux = async (req, res) => {
    try{
        const creneaux = await Creneaux.selectAll()
        if(creneaux.rowCount > 0){
            res.status(200).json(creneaux.rows);
        }else{
            res.status(404).json({message : "Il n'existe aucun créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getCreneau = async (req, res) => {
    try{
        const creneaux = await Creneaux.selectOne(req.params.idCreneau)
        if(creneaux.rowCount > 0){
            res.status(200).json(creneaux.rows[0]);
        }else{
            res.status(404).json({message : "Il n'existe aucun créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.createCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.create(data);
        if(result.rowCount > 0){
            res.status(201).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de création de créneau"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteCreneaux = async (req, res) => {
    try{
        const result = await Creneaux.delete(req.params.idCreneau);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(404).json({message : "Erreur de suppression de créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.updateCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.update(data, req.params.idCreneau);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification du créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getJurys = async (req, res) => {
    try{
        //let data = req.body;
        const result = await Creneaux.selectJurys(req.params.idCreneau);
        if(result.rowCount > 0){
            res.status(200).json(result.rows)
        }else{
            res.status(404).json({message : "Ce créneau ne possède aucun jury ou le créneau n'existe pas"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteJury = async (req, res) => {
    try{
        const result = await Creneaux.deleteJury(req.params.idCreneau, req.params.idProf);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0])
        }else{
            res.status(404).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

exports.setJurys = async (req, res) => {
    try{
        const data = req.body.jurys
        const result = await Creneaux.setJurys(req.params.idCreneau, data)
        if(result.length > 0){
            res.status(201).json(result)
        }else{
            res.status(400).json({message : "Erreur d'affectation de jury"})
        }
    }catch(err){
        res.status(500).json({message : err});
    }

}