var log4js = require('log4js');
log4js.loadAppender('console');
var logger = log4js.getLogger('{featureDAO}');
logger.setLevel('DEBUG');

// define schema
var mongoose = require('mongoose');
var featureSchema = mongoose.Schema({
    name: String
}, { collection: 'feature' });
var feature = mongoose.model('feature', featureSchema);

//
module.exports.featuresCount = function(resp) {
    feature.count({}, function (err, count) {
        if (err) {
            console.log(err);
        }
        resp.send({featureCount: count});
        logger.debug("feature count : " +  count);
    });
};

module.exports.allFeatures = function (res) {
    feature.find(function (err, features) {
        if (err)
            res.send(err);
        res.json(features);
        logger.debug("features : " +  features);
    });
};

module.exports.feature = function (req, res) {
    var query = feature.find({
        '_id': req.params.feature_id
    });

    feature.find(query).exec(function (err, feature) {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(feature);
        logger.debug("feature by id : " + feature);
    });
};
