
// Imports
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require('../middleware/auth');

const creneauxCtrl = require("../controllers/creneaux");

//Récupérer tous les créneaux
router.get("/", /*auth.isAuth, */creneauxCtrl.getAllCreneaux);
//Récupérer un créneau
router.get("/:idCreneau", /*auth.isAuth,*/ creneauxCtrl.getCreneau)
//Créer un créneau selon l'évènement
router.post("/", auth.isAuth, auth.isAdmin, creneauxCtrl.createCreneaux);
//Supprimer un créneau
router.delete("/:idCreneau", auth.isAuth, auth.isAdmin, creneauxCtrl.deleteCreneaux);
//Met à jour un créneau
router.put("/:idCreneau", /*auth.isAuth, auth.isAdmin,*/ creneauxCtrl.updateCreneaux);
//Récupérer les jurys du créneau
router.get("/:idCreneau/jurys", creneauxCtrl.getJurys)

module.exports = router;