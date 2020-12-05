
// Imports
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv/config');
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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