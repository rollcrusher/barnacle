const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Animal = require('../models/AnimalModel');

module.exports.getAllAnimals = (res) => {
	Animal.find((err, animals) => {
		if (err)
			res.send(err);
		res.json(animals);
		logger.debug('animals : ' + animals);
	});
};

module.exports.getAnimalById = (req, res) => {
    const query = {"_id": req.params.animal_id};

    Animal.findOne(query).populate('features').exec((err, animal) => {
        if (err) {
            res.send({error: err.message});
            logger.error(err);
            return;
        }

        res.json(animal);
        logger.debug('animal by id : ' + animal);
    });
};

module.exports.getAnimalsByFeature = (req, res) => {
    let query = Animal.find(
        {features: {$eq: req.params.feature_id}}
    ).select({name: 1});

    Animal.find(query).exec((err, animals) => {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(animals);
        logger.debug('animals by feature : ' + animals);
    });
};

