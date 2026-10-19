const mongoose = require('mongoose');

// Schema is a class defined within the mongoose library
// to set up Collection (Table) of Documents (rows)
const noteSchema = mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    dateAdded: {    // Method POST
        type: String,
        required: true
    },
    dateUpdated: {  // Method PUT
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema);
