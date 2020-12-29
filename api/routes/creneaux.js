
// Imports
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const creneauxCtrl = require("../controllers/creneaux");

//Récupérer tous les créneaux
router.get("/", admin, creneauxCtrl.getAllCreneaux);
//Récupérer un créneau
router.get("/:idCreneau", admin, creneauxCtrl.getCreneau)
//Récupérer les créneaux d'un évènement
router.get("/evenements/:idEvenement", creneauxCtrl.getByEvent);
//Créer un créneau selon l'évènement
router.post("/", admin, creneauxCtrl.createCreneaux);
//Supprimer un créneau
router.delete("/:idCreneau", admin, creneauxCtrl.deleteCreneaux);
//Met à jour un créneau
router.put("/:idCreneau", admin, creneauxCtrl.updateCreneaux);

//Réservation de créneaux, met à jour idGroupe
//router.put("/:idCreneau/reserver", creneauxCtrl.reserverCreneaux);
//Annuler réservation, enlève l'idGroupe
//router.put("/:idCreneau/annulerReservation", creneauxCtrl.annulerReservationCreneaux);

module.exports = router;