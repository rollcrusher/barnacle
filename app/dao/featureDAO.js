const log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'debug';

// define schema
var mongoose = require('mongoose');
var featureSchema = mongoose.Schema({
    name: String
}, {collection: 'feature'});
var Feature = mongoose.model('feature', featureSchema);

//
module.exports.featuresCount = function (resp) {
    Feature.count({}, function (err, count) {
        if (err) {
            console.log(err);
        }
        resp.send({featuresCount: count});
        logger.debug("features count : " + count);
    });
};

module.exports.allFeatures = function (res) {
    Feature.find(function (err, features) {
        if (err)
            res.send(err);
        res.json(features);
        logger.debug("features : " + features);
    });
};

module.exports.feature = function (req, res) {
    let query = Feature.find({
        '_id': req.params.feature_id
    });

    Feature.find(query).exec(function (err, feature) {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(feature);
        logger.debug("feature by id : " + feature);
    });
};
