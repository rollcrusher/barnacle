const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Animal = require('../models/AnimalModel');

module.exports = {

    getAllAnimals: (res) => {
        Animal.find((err, animals) => {
            if (err) {
                res.send(err);
                logger.error(err);
                return;
            }
            res.json(animals);
            logger.debug('animals: ' + animals);
        });
    },

    getAnimalById: (req, res) => {
        const query = {'_id': req.params.animalId};

        Animal.findOne(query).exec((err, animal) => {
            if (err) {
                res.send({error: err.message});
                logger.error(err);
                return;
            }

            res.json(animal);
            logger.debug('an animal by id: ' + JSON.stringify(animal));
        });
    },

    getAnimalWithPopulatedFeaturesById: (req, res) => {
        const query = {'_id': req.params.animalId};

        Animal.findOne(query).populate('features').exec((err, animal) => {
            if (err) {
                res.send({error: err.message});
                logger.error(err);
                return;
            }

            res.json(animal);
            logger.debug('an animal by id: ' + JSON.stringify(animal));
        });
    },

    getAnimalsByFeature: (req, res) => {
        let query = Animal.find(
            {features: {$eq: req.params.featureId}}
        ).select({name: 1});

        Animal.find(query).exec((err, animals) => {
            if (err) {
                res.send(err);
                logger.error(err);
                return;
            }
            res.json(animals);
            logger.debug('animals by feature: ' + JSON.stringify(animals));
        });
    },

    createAnimal: (req, res) => {
        Animal.create(req.body, (err, animal) => {
            if (err) {
                res.send(err);
                logger.error(err);
                return;
            }
            res.json(animal);
            logger.debug('a new animal has been created: ' + JSON.stringify(animal));
        });
    },

    editAnimal: (req, res) => {
        const query = {
            '_id': req.body.id
        };

        Animal.findOneAndUpdate(
            query,
            {$set: req.body},
            {new: true},
            (err, animal) => {
                if (err) {
                    res.send(err);
                    logger.error(err);
                    return;
                }
                res.json(animal);
                logger.debug('the animal has been updated: ' + JSON.stringify(animal));
            });
    },

    deleteAnimal: (req, res) => {
        const query = {'_id': req.params.animalId};

        Animal.remove(query, (err) => {
            if (err) {
                res.send(err);
                logger.error(err);
                return;
            }
            res.json({
                message: 'Success',
                id: req.params.animalId
            });
            logger.debug('the animal has been deleted: ' + req.params.animalId);
        });
    }
};
