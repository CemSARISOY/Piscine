
// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const etudiantCtrl = require("../controllers/etudiants");

router.get("/", auth, etudiantCtrl.getAllEtudiant);
router.get("/:id", auth, etudiantCtrl.getOneEtudiant);
router.post("/", etudiantCtrl.createEtudiant);
router.delete("/:id", auth, etudiantCtrl.deleteEtudiant);
router.put("/:id", auth, etudiantCtrl.updateEtudiant);

router.post("/login", etudiantCtrl.login);
router.get("/promo/:promo", admin, etudiantCtrl.getEtudiantsInPromo);


module.exports = router;
