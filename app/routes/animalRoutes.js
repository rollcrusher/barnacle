var AnimalDAO = require('../dao/animalDAO');

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

    // get top features
    app.get('/api/animals/topfeatures', function (req, res) {
        AnimalDAO.topfeatures(req, res);
    });

    // get animals by feature id
    app.get('/api/animals/:feature_id', function (req, res) {
        AnimalDAO.animalsByFeature(req, res);
    });
};