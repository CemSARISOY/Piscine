
// Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const evenementsCtrl = require("../controllers/evenements");

router.get("/", evenementsCtrl.getAllEvents);
router.get("/:id", evenementsCtrl.getOneEvent);
router.post("/", evenementsCtrl.createEvent);
router.put("/:id", evenementsCtrl.updateEvent);
router.delete("/:id", evenementsCtrl.deleteEvent);


module.exports = router;