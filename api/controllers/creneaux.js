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

exports.getByEvent = async (req, res) => {
    try{
        const creneaux = await Creneaux.selectByEvent(req.params.idEvenement)
        if(creneaux.rowCount == 1){
            res.status(200).json(creneaux.rows[0])
        }else{
            res.status(404).json({message : "Il n'existe aucun créneau sur cet évènement"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.createCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.create(data);
        if(result.rowCount == 1){
            res.status(201).json(result.rows[0])
        }else{
            res.status(404).json({message : "Erreur de création de créneau"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteCreneaux = async (req, res) => {
    try{
        const result = await Creneaux.delete(req.params.idCreneau);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(400).json({message : "Erreur de suppression de créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.updateCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.update(data, req.params.idCreneau);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification du créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.reserverCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.reserver(req.params.idCreneau);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de réservation du créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.annulerReservationCreneaux = async (req, res) => {
    try{
        let data = req.body;
        const result = await Creneaux.annulerRes(req.params.idCreneau);
        if(result.rowCount == 1){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur d'annulation du créneau"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};