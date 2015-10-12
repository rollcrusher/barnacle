var log4js = require('log4js');
log4js.loadAppender('console');
log4js.addAppender(log4js.appenders.console());
var logger = log4js.getLogger('{animalDAO}');
logger.setLevel('DEBUG');

// define schema
var mongoose = require('mongoose');
var animalSchema = mongoose.Schema({
    name: String
}, { collection: 'animal' });
var Animal = mongoose.model('animal', animalSchema);

//
module.exports.animalsCount = function(resp) {
    Animal.count({}, function (err, count) {
        if (err) {
            console.log(err);
        }
        resp.send({animalCount: count});
        logger.debug("animal count : " +  count);
    });
};

module.exports.allAnimal = function (res) {
    Animal.find(function (err, animals) {
        if (err)
            res.send(err);
        res.json(animals);
        logger.debug("animals : " +  animals);
    });
};

module.exports.animal = function (req, res) {
    var query = Animal.find({
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
