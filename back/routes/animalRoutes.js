const AnimalDAO = require('../dao/animalDAO');

module.exports = (app) => {

    app.get('/api/animals/list', (req, res) => {
        AnimalDAO.getAllAnimals(res);
    });

    app.get('/api/animals/:animalId', (req, res) => {
        AnimalDAO.getAnimalById(req, res);
    });

    app.put('/api/animals/create', (req, res) => {
        AnimalDAO.createAnimal(req, res);
    });

    app.post('/api/animals/edit', (req, res) => {
        AnimalDAO.editAnimal(req, res);
    });

    app.delete('/api/animals/delete/:animalId', (req, res) => {
        AnimalDAO.deleteAnimal(req, res);
    });
};
