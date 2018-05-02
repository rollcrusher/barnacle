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
    const query = {'_id': req.params.animalId};

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
        {features: {$eq: req.params.featureId}}
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

module.exports.createAnimal = (req, res) => {
    Animal.create(req.body, (err, animal) => {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(animal);
        logger.debug('new animal has been created: ' + animal);
    });
};

module.exports.editAnimal = (req, res) => {
    const query = {
        '_id': req.body.id
    };
    Animal.update(
        query,
        req.body,
        {},
        (err, animal) => {
            if (err) {
                res.send(err);
                logger.error(err);
            }
            res.json(animal);
            logger.debug('new animal has been edited: ' + animal);
        }
    );
};

module.exports.deleteAnimal = (req, res) => {
    const query = {'_id': req.params.animalId};

    Animal.remove(query, (err, animal) => {
        if (err) {
            res.send(err);
            logger.error(err);
            return;
        }
        res.json({
            message: 'Success',
            id: req.params.animalId
        });
        logger.debug('animal has been deleted: ' + req.params.animalId);
    });
};
