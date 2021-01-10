
// Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const evenementsCtrl = require("../controllers/evenements");

router.get("/", auth.isAuth, evenementsCtrl.getAllEvents);
router.get("/:id", auth.isAuth, evenementsCtrl.getOneEvent);
router.post("/",auth.isAuth, auth.isAdmin, evenementsCtrl.createEvent);
router.put("/:id",auth.isAuth, auth.isAdmin, evenementsCtrl.updateEvent);
router.delete("/:id",auth.isAuth, auth.isAdmin, evenementsCtrl.deleteEvent);


module.exports = router;