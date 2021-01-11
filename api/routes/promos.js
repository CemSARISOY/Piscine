// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const promoCtrl = require("../controllers/promos");


router.get("/", auth.isAuth, auth.isAdmin, promoCtrl.getAllPromo);
router.post("/", auth.isAuth, auth.isAdmin, promoCtrl.createPromo);
router.delete("/:anneePromo", auth.isAuth, auth.isAdmin, promoCtrl.deletePromo);
router.get("/:id/etudiants", auth.isAuth, auth.isAdmin, promoCtrl.getEtudiantsInPromo);



module.exports = router;
