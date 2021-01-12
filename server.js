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

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});