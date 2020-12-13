
// Imports
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const creneauxCtrl = require("../controllers/creneaux");

//Récupérer les créneaux d'un évènement
router.get("/evenements/:idEvenement/creneaux", creneauxCtrl.getByEvent);
//Créer un créneau selon l'évènement
router.post("/evenements/:idEvenement/create", admin, creneauxCtrl.createCreneaux);
//Supprimer un créneau
router.delete("/evenements/:idEvenement/creneaux/:idCreneau", admin, creneauxCtrl.deleteCreneaux);
//Met à jour un créneau
router.put("/evenements/:idEvenement/creneaux/:idCreneau", admin, creneauxCtrl.updateCreneaux);

//Réservation de créneaux, met à jour idGroupe
router.put("/evenements/:idEvenement/creneaux/:idCreneau/reserver", creneauxCtrl.reserverCreneaux);
//Annuler réservation, enlève l'idGroupe
router.put("/evenements/:idEvenement/creneaux/:idCreneau/annulerreservation", creneauxCtrl.annulerReservationCreneaux);

module.exports = router;