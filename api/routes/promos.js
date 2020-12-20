// Imports
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const promoCtrl = require("../controllers/promos");


router.get("/",auth.isAdmin, promoCtrl.getAllPromo);
router.post("/",auth.isAdmin, promoCtrl.createPromo);
router.delete("/:anneePromo",auth.isAdmin, promoCtrl.deletePromo);




module.exports = router;
