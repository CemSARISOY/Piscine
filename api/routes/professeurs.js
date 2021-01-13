
// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const professeurCtrl = require("../controllers/professeurs");

//rediriger les paGES
router.post("/", auth.isAuth, auth.isAdmin, professeurCtrl.createProfesseur);
router.get("/:id", auth.isAuth, professeurCtrl.getOneProfesseur);
router.get("/", auth.isAuth, professeurCtrl.getAllProf);
router.put("/:id", auth.isAuth, auth.isAdmin, professeurCtrl.updateProfesseur);
router.delete("/:id", auth.isAuth, auth.isAdmin, professeurCtrl.deleteProfesseur);

module.exports = router;