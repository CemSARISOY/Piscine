// Imports
const express = require("express");
const router = express.Router();
const admin = require('../middleware/admin');
const promoCtrl = require("../controllers/promos");


router.get("/",admin, promoCtrl.getAllPromo);
router.post("/",admin, promoCtrl.createPromo);
router.delete("/:anneePromo",admin, promoCtrl.deletePromo);




module.exports = router;
