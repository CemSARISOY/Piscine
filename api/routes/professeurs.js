
// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const professeurCtrl = require("../controllers/professeurs");

//rediriger les paGES
router.post("/",auth.isAdmin, professeurCtrl.createProfesseur);
router.get("/:id",auth.isAdmin, professeurCtrl.getOneProfesseur);
router.get("/",auth.isAdmin, professeurCtrl.getAllProf);
router.put("/:id",auth.isAdmin, professeurCtrl.updateProfesseur);
router.delete("/:id",auth.isAdmin, professeurCtrl.deleteProfesseur);

module.exports = router;