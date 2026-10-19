/*
We want to set our paths, other words our routes,
to the 
*/

const noteModel = require('../models/NoteModel.js');
const express = require('express');
const router = express.Router();

router.post("/notes" , async (req, res) => {
    if(!req.body.content){
        // JSON body that was passed through the request
        return res.status(400).send({ 
            message: "Note cannot be empty, must fill in the request body"
        });
    }
    // If the request was valid
    try {
        const note = new NoteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateAdded: req.body.dateAdded,
            dateUpdated: req.body.dateUpdated
        });
        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err){
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note"
        });
    }
})
router.get("/notes", async (req, res) => {
    try {
        const notes = await noteModel.find();
        return res.status(200).send(notes);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    }
});
router.put("/notes/:id", async (req, res) => {
    const editableFields = [
        "noteTitle",
        "noteDescription",
        "priority",
        "dateAdded",
        "dateUpdated"
    ];
    const updates = {};
    for (const field of editableFields) {
        if (req.body?.[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }
    if (Object.keys(updates).length === 0) {
        return res.status(400).send({
            message: "Provide at least one note field to update."
        });
    }
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found." });
        }
        return res.status(200).send(updatedNote);
    } catch (err) {
        const statusCode = ["CastError", "ValidationError"].includes(err.name)
            ? 400
            : 500;
        return res.status(statusCode).send({
            message: err.message || "Some error occurred while updating the note."
        });
    }
});
router.delete("/notes/:id", async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).send({ message: "Note not found." });
        }
        return res.status(200).send({
            message: "Note deleted successfully.",
            deletedNote
        });
    } catch (err) {
        const statusCode = err.name === "CastError" ? 400 : 500;
        return res.status(statusCode).send({
            message: err.message || "Some error occurred while deleting the note."
        });
    }
});
module.exports = router;