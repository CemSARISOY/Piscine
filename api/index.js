
// Imports
const express = require('express');
const cors = require('cors')
const session = require("express-session")
const cookieParser = require("cookie-parser")
require('dotenv/config');
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const corsSettings= {
    origin:true,
    credentials: true
};
//app.use(cors(corsSettings));
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // *
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Authorization , Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


// Import routes
const etudiantsRoute = require("./routes/etudiants");
const evenementsRoute = require("./routes/evenements");
const professeursRoute = require("./routes/professeurs")
const creneauxRoute = require("./routes/creneaux")
const creneauxPromo = require("./routes/promos")

app.use("/api/etudiants", etudiantsRoute)
app.use("/api/evenements", evenementsRoute)
app.use("/api/professeurs", professeursRoute)
app.use("/api/creneaux", creneauxRoute)
app.use("/api/promos", creneauxPromo)


// Server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});