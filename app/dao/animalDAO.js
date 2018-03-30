const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

// define schema
const mongoose = require('mongoose');
const animalSchema = mongoose.Schema({
	name: String
}, {collection: 'animal'});
const Animal = mongoose.model('animal', animalSchema);

//
module.exports.animalsCount = (resp) => {
	Animal.count({}, (err, count) => {
		if (err) {
			logger.error(err);
		}
		resp.send({animalsCount: count});
		logger.debug('animals count : ' + count);
	});
};

module.exports.allAnimals = (res) => {
	Animal.find((err, animals) => {
		if (err)
			res.send(err);
		res.json(animals);
		logger.debug('animals : ' + animals);
	});
};

module.exports.animal = (req, res) => {
	let query = Animal.find({
		'_id': req.params.animal_id
	});

	Animal.find(query).exec((err, animal) => {
		if (err) {
			res.send(err);
			logger.error(err);
		}
		res.json(animal);
		logger.debug('animal by id : ' + animal);
	});
};

module.exports.topfeatures = (req, res) => {
	Animal.aggregate(
		{$unwind: '$features'},
		{$group: {_id: '$features', count: {$sum: 1}}},
		{$sort: {count: -1}},
		(err, result) => {
			if (err) {
				res.send(err);
				logger.error(err);
			}
			res.json(result);
			logger.debug('feature : ' + result);
		});
};

module.exports.animalsByFeature = (req, res) => {
	let query = Animal.find(
		{features: {$eq: req.params.feature_id}}
	).select({name: 1});

	/* db.animal.find( { features: { $eq: '561e5a33349631fc0e000002' } } ) */

	Animal.find(query).exec((err, animals) => {
		if (err) {
			res.send(err);
			logger.error(err);
		}
		res.json(animals);
		logger.debug('animals by feature : ' + animals);
	});
};
