
// Imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();

// Middlewares
app.use(express.json())

// Import routes
const etudiantsRoute = require("./routes/etudiants");
const evenementsRoute = require("./routes/evenements");
const professeursRoute = require("./routes/professeurs")

app.use("/etudiants", etudiantsRoute)
app.use("/evenements", evenementsRoute)
app.use("/professeurs", professeursRoute)


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser:true },
    (err) => {
        if (err) console.log("Unable to connect to DB");
        else console.log("Connected to DB");
    }
);

// Server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});