
// Imports
const express = require("express");
const router = express.Router();

const etudiantCtrl = require("../controllers/etudiants");

router.get("/", etudiantCtrl.getAllEtudiant);
router.get("/:id", etudiantCtrl.getOneEtudiant);
router.post("/", etudiantCtrl.createEtudiant);
router.delete("/:id", etudiantCtrl.deleteEtudiant);
router.put("/:id", etudiantCtrl.updateEtudiant);


module.exports = router;
