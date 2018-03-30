const log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'debug';

// define schema
let mongoose1 = require('mongoose');
let animalSchema = mongoose1.Schema({
    name: String
}, {collection: 'animal'});
let Animal = mongoose1.model('animal', animalSchema);

//
module.exports.animalsCount = function (resp) {
    Animal.count({}, function (err, count) {
        if (err) {
            console.log(err);
        }
        resp.send({animalsCount: count});
        logger.debug("animals count : " + count);
    });
};

module.exports.allAnimals = function (res) {
    Animal.find(function (err, animals) {
        if (err)
            res.send(err);
        res.json(animals);
        logger.debug("animals : " + animals);
    });
};

module.exports.animal = function (req, res) {
    let query = Animal.find({
        '_id': req.params.animal_id
    });

    Animal.find(query).exec(function (err, animal) {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(animal);
        logger.debug("animal by id : " + animal);
    });
};

module.exports.topfeatures = function (req, res) {
    Animal.aggregate(
        {$unwind: "$features"},
        {$group: {_id: "$features", count: {$sum: 1}}},
        {$sort: {count: -1}},
        function (err, result) {
            if (err) {
                res.send(err);
                logger.error(err);
            }
            res.json(result);
            logger.debug("feature : " + result);
        });
};

module.exports.animalsByFeature = function (req, res) {
    let query = Animal.find(
        {features: {$eq: req.params.feature_id}}
    ).select({name: 1});

    /* db.animal.find( { features: { $eq: "561e5a33349631fc0e000002" } } ) */

    Animal.find(query).exec(function (err, animals) {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(animals);
        logger.debug("animals by feature : " + animals);
    });
};