const AnimalDAO = require(global.__base + 'dao/animalDAO');

module.exports = (app) => {

    // get all animals
    app.get('/api/animals/list', (req, res) => {
        AnimalDAO.getAllAnimals(res);
    });

    // get animal by id
    app.get('/api/animals/:animal_id', (req, res) => {
        AnimalDAO.animalById(req, res);
    });
};
