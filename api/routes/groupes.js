const express = require("express");
const router = express.Router();
const groupes = require("../controllers/groupes");

//Créer un groupe
router.post("/", groupes.createGroupe);

//Retrouver tout les groupes
router.get("/", groupes.getAllGroupe)

//Retrouver un groupe
router.get("/:id", groupes.getOneGroupe)

//Actualiser un groupe avec son id
router.put("/:id", groupes.updateGroupe)

//Supprimer un groupe avec son id
router.delete("/:id", groupes.deleteGroupe)

//Recupere les etudiants d'un groupe avec son id
router.get("/groupe/:id", groupes.findEtudiants)

module.exports = router;
