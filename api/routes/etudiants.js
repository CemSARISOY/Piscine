
// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const etudiantCtrl = require("../controllers/etudiants");

router.post("/", etudiantCtrl.createEtudiant);
router.post("/login", etudiantCtrl.login);
router.post("/token", etudiantCtrl.verifyToken);

router.post("/logout", etudiantCtrl.logout);
router.get("/", auth.isAuth, etudiantCtrl.getAllEtudiant);
router.get("/:id", auth.isAuth, etudiantCtrl.getOneEtudiant);
router.delete("/:id", auth.isAuth, etudiantCtrl.deleteEtudiant);
router.put("/:id", auth.isAuth, etudiantCtrl.updateEtudiant);
router.get("/:id/evenements", auth.isAuth, etudiantCtrl.getEvent);

router.get("/promo/:promo", auth.isAdmin, etudiantCtrl.getEtudiantsInPromo);


module.exports = router;
