
// Imports
const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const creneauxCtrl = require("../controllers/creneaux");

//Récupérer les créneaux d'un évènement
router.get("/:idEvenement/creneaux", creneauxCtrl.getByEvent);
//Créer un créneau selon l'évènement
router.post("/:idEvenement/create", admin, creneauxCtrl.createCreneaux);
//Supprimer un créneau
router.delete("/:idEvenement/creneaux/delete/:idCreneau", admin, creneauxCtrl.deleteCreneaux);
//Met à jour un créneau
router.put("/:idEvenement/creneaux/update/:idCreneau", admin, creneauxCtrl.updateCreneaux);

//Réservation de créneaux, met à jour idGroupe
router.put("/:idEvenement/creneaux/reserver/:idCreneau", creneauxCtrl.reserverCreneaux);
//Annuler réservation, enlève l'idGroupe
router.put("/:idEvenement/creneaux/annulerreservation/:idCreneau", creneauxCtrl.annulerReservationCreneaux);

module.exports = router;