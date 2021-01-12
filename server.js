// Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up Express app
var app = express();

// Sets up port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    var notes = [];
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        newNote.id = notes.length;
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
            err ? console.error(err) : console.log('Note added!')
        );
        res.send(notes);
    });
});

app.delete("/api/notes/:id", function(req, res) {
    var removeNoteId = req.params.id;
    var notes = [];
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        var updatedNotes = notes.filter(note => note.id != removeNoteId);
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) =>
            err ? console.error(err) : console.log('Note deleted!')
        );
        res.send(updatedNotes);
    });
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});