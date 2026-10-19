const express = require('express');
const mongoose = require('mongoose');

const noteRouter = require('./routes/NoteRoutes.js');
const DB_URL = "mongodb+srv://omoruyioredia_db_user:p4RqwTBA4CqSDXv0@comp3123cluster.bflvcif.mongodb.net/?appName=comp3123Cluster"

const PORT = process.env.PORT || 8081;

const app = express();
// Middeware
app.use(express.json()); // Serving JSON files
app.use(express.urlencoded({ extended: true })); // Accessing URL parameters and query strings

//Root route
app.get('/', (req, res) => {
    res.send("<h2>Welcome to the Note Taking App - Server root path contents</h2>");
})

// Set up the API routes - No folder API, will be used in the URL
app.use('/api/notes', noteRouter);

// Connect to MongoDB Atlas
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the DB")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Could not connect to the DB");
        console.log(err);
        process.exit(1);
    });
