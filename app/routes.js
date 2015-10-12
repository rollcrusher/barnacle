var AnimalDAO = require('./dao/animalDAO');

module.exports = function (app) {

    // get all animals
    app.get('/api/animals', function (req, res) {
        AnimalDAO.allAnimals(res)
    });

    // get animals count
    app.get('/api/animals/count', function (req, res) {
        AnimalDAO.animalsCount(res);
    });

    // get animal by id
    app.get('/api/animal/:animal_id', function (req, res) {
        AnimalDAO.animal(req, res);
    });

    // get animals by Feature
    app.get('/api/features', function (req, res) {

    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};