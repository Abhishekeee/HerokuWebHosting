const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8000;

// Serving Static files
app.use(express.static(path.join(__dirname, '../public')));

// Set View Engine
app.set('view engine', 'hbs');

// Set View path 
app.set('views', path.join(__dirname, '../templates/views'));

// Register Partials
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/weather", (req, res) => {
    res.render("weather");
})
app.get("*", (req, res) => {
    res.render("404");
})
app.listen(port);