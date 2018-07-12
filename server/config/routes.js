const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');

module.exports = function(app) {
    app.get('/', function(req, res) {
        Animal.find({}, function(err, animal) {
            animal = animal;
            res.render("index", { data: animal });
        });
    });
    app.get('/animal/new', function(req, res) {
        res.render("new");
    });

    app.post('/animal', function(req, res) {
        var animal = new Animal({ name: req.body.name, type: req.body.type, description: req.body.description });
        animal.save(function(err) {
            if (err) {
                console.log('something went wrong');
            } else {
                console.log('successfully added a animal!');
                res.redirect('/');
            }
        });
    });
    app.get('/animal/:id', function(req, res) {
        Animal.find({ _id: req.params.id }, function(err, animal) {
            if (err) {
                console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route

                console.log('successfully retrieved animals!');
                res.render('show', { animal: animal[0] });
            }
        });
    });
    app.get('/animal/edit/:id', function(req, res) {
        Animal.findOne({ _id: req.params.id }, function(err, animals) {
            if (err) {
                console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route

                console.log('successfully retrieved animals!');
                res.render('edit', { animal: animals });
            }
        });
    });
    app.post('/animal/:id', function(req, res) {
        Animal.update({ _id: req.params.id }, req.body, function(err, result) {

            if (err) { console.log(err); }
            res.redirect('/');
        });
    });


    app.post('/animal/destroy/:id', function(req, res) {
        Animal.remove({ _id: req.params.id }, function(err, result) {
            if (err) { console.log(err); }
            res.redirect('/');
        });
    });

}