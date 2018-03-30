const AnimalDAO = require('../dao/animalDAO');

module.exports = (app) => {

	// get all animals
	app.get('/api/animals', (req, res) => {
		AnimalDAO.allAnimals(res);
	});

	// get animals count
	app.get('/api/animals/count', (req, res) => {
		AnimalDAO.animalsCount(res);
	});

	// get animal by id
	app.get('/api/animals/:animal_id', (req, res) => {
		AnimalDAO.animal(req, res);
	});

	// get top features
	app.get('/api/animals/topfeatures', (req, res) => {
		AnimalDAO.topfeatures(req, res);
	});

	// get animals by feature id
	app.get('/api/animals/:feature_id', (req, res) => {
		AnimalDAO.animalsByFeature(req, res);
	});
};
