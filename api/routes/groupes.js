const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const groupes = require("../controllers/groupes");

//Créer un groupe
router.post("/", auth.isAuth, groupes.createGroupe);

//Retrouver tout les groupes
router.get("/", /*auth.isAuth, auth.isAdmin,*/ groupes.getAllGroupe)

//Retrouver un groupe
router.get("/:id", auth.isAuth, groupes.getOneGroupe)

//Actualiser un groupe avec son id
router.put("/:id", auth.isAuth, groupes.updateGroupe)

//Supprimer un groupe avec son id
router.delete("/:id", auth.isAuth, groupes.deleteGroupe)

//Recupere les etudiants d'un groupe avec son id
router.get("/:id/etudiants", auth.isAuth, groupes.findEtudiants)

module.exports = router;
