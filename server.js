var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/animal');
mongoose.Promise = global.Promise;
var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Custom error message"] },
    type: { type: String, required: [true, "Custom error message"] },
    description: { type: String, required: [true, "Custom error message"] },
});

mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');

require('./server/config/routes.js')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
});