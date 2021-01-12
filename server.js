// Dependencies
var express = require("express");
var fs = require("fs");

// Sets up Express app
var app = express();

// Sets up port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});