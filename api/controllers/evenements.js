const Evenements = require("../model/evenementsModel");

exports.getAllEvents = async (req, res) => {
    try{
        const events = await Evenements.selectAll();
        if(events.rowCount > 0){
            res.status(200).json(events.rows);
        }else{
            res.status(404).json({message: "Il n'existe pas d'evenements"});
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getOneEvent = async (req, res) => {
    try{
        const event = await Evenements.select(req.params.id);
        if(event.rowCount > 0){
            res.status(200).json(event.rows[0]);
        }else{
            res.status(404).json({message: "Cet event n'existe pas"});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

/* 
    req.body = 
    {
        promo: Int
        nomEvenement: varchar
        dateDebut: timestamp
        duree: Int
        dateLimiteRes: timestamp
        dureeCreneau: 1:30:00
        creneaux : [{
                    date : timestamp
                    heure: 23:59:59
                    salle: varchar
                    jury: integer
                    }]
    }

*/
exports.createEvent = async (req, res) => {
    try{
        let data = req.body;
        const event = await Evenements.create(data);
        if(event.rowCount > 0){
            res.status(201).json(event.rows[0]);
        }else{
            res.status(400).json({message: "Erreur de création"});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.deleteEvent = async (req, res) => {
    try{
        const event = await Evenements.delete(req.params.id);
        if(event.rowCount > 0){
            res.status(200).json(event.rows[0]);
        }else{
            res.status(404).json({message: "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.updateEvent = async (req, res) => {
    try{
        let data = req.body
        const result = await Evenements.update(data, req.params.id);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
}