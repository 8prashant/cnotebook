const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //Express-validator
const fetchdata = require("../middleware/fetchdata");
const Note = require("../models/Note");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchdata, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); //Notes=array of objects
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post("/addnote",fetchdata,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({min: 5,}),
  async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
    
        const { title, description, tag } = req.body;
        const note = await Note.create({
          user: req.user.id,
          title: title,
          description: description,
          tag: tag,
        });
    
        res.json(note); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchdata, async (req, res) => {//By changing the type 'PUT' we can do multiple works at the same time 
    try {
        const { title, description, tag } = req.body;
    
        const newNotes={};
        if(title){newNotes.title=title;}
        if(description){newNotes.description=description;}
        if(tag){newNotes.tag=tag;}
    
        let note=await Note.findById(req.params.id);
        if(!note){//CHECK WHEATHER A NOTE WITH THE ID EXIST OR NOT.
            return res.status(404).send("Not Found");
        }
    
        if(note.user.toString()!==req.user.id){//Check wheather the note's user and logined user are same or not
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        //$set: This is a MongoDB update operator used to specify the fields to be updated. 
        // new: true: It tells Mongoose to return the updated document rather than the original document. 
        //            By default, findByIdAndUpdate returns the document as it was before the update.
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchdata, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        // Allow deletion only if user owns this Note
        if(note.user.toString()!==req.user.id){//Check wheather the note's user and logined user are same or not
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;
