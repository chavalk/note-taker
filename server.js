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
    console.log(newNote);
    var notes = [];
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        notes.push(newNote);
        console.log(notes);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
            err ? console.error(err) : console.log('Success!')
        );
        res.send(notes);
    });
    console.log(notes);
    
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});