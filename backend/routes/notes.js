const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using GET /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.json(notes);
});

//Route 2: Add a new note using POST /api/notes/addnote. Login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Check if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

//Route 3: Update an existing note using UPDATE /api/notes/updatenote. Login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found!");
    }

    // Allow updation only if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error in updating note");
  }
});

//Route 4: Delete an existing note using DELETE /api/notes/deletenote. Login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found!");
    }

    // Allow deletion only if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)

    res.json({success: 'Note has been deleted.'});
  } catch (error) {
    console.error(error);
    res.status(400).send("Error in Deleting note");
  }
});

module.exports = router;