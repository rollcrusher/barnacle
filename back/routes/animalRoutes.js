const AnimalDAO = require('../dao/animalDAO');

module.exports = (app) => {

    app.get('/api/animals/list', (req, res) => {
        AnimalDAO.getAllAnimals(res);
    });

    app.get('/api/animals/:animal_id', (req, res) => {
        AnimalDAO.getAnimalById(req, res);
    });
};
