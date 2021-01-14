const Promos = require("../model/promosModel");

exports.getAllPromo = async (req, res) => {
    try{
        const promos = await Promos.selectAll()
        if(promos.rowCount > 0){
            res.status(200).json(promos.rows);
        }else{
            res.status(404).json({message : "Il n'existe aucune promo"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.createPromo = async (req, res) => {
    try{
        let data = req.body;
        const result = await Promos.create(data);
        if(result.rowCount > 0){
            res.status(201).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deletePromo = async (req, res) => {
    try{
        const result = await Promos.delete(req.params.anneePromo);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(404).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getEtudiantsInPromo = async (req, res) => {
    try{
        const etudiants = await Promos.selectByPromo(req.params.id);
        if(etudiants.rowCount > 0){
            res.status(200).json(etudiants.rows);
        }else{
            res.status(404).json({message: "Aucun étudiant dans cette promo"});
        }

    }catch(err){
        res.status(500).json({message : err.message});
    }
}