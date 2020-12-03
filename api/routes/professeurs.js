
// Imports
const express = require("express");
const router = express.Router();

const professeurCtrl = require("../controllers/professeurs");


router.post("/", professeurCtrl.createProfesseur);
router.get("/:id", professeurCtrl.getOneProfesseur);
router.get("/", professeurCtrl.getAllProf);
router.delete("/:id", professeurCtrl.deleteProfesseur);

module.exports = router;