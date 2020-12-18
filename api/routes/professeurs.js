
// Imports
const express = require("express");
const router = express.Router();

const professeurCtrl = require("../controllers/professeurs");

//rediriger les paGES
router.post("/", professeurCtrl.createProfesseur);
router.get("/:id", professeurCtrl.getOneProfesseur);
router.get("/", professeurCtrl.getAllProf);
router.put("/:id", professeurCtrl.updateProfesseur);
router.delete("/:id", professeurCtrl.deleteProfesseur);

module.exports = router;