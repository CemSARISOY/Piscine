
// Imports
const express = require('express');
const cors = require('cors')
const session = require("express-session")
require('dotenv/config');
const app = express();

// Middlewares
app.use(express.json());

const corsSettings= {
    origin:true,
    credentials: true
};
app.use(cors(corsSettings));

app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:60000}
}));

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