const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Feature = require('../models/Feature');

module.exports.getAllFeatures = (res) => {
    Feature.find((err, features) => {
        if (err)
            res.send(err);
        res.json(features);
        logger.debug('features : ' + features);
    });
};

module.exports.getFeatureById = (req, res) => {
    const query = {"_id": req.params.feature_id};

    Feature.findOne(query).populate('features').exec((err, feature) => {
        if (err) {
            res.send({error: err.message});
            logger.error(err);
            return;
        }

        res.json(feature);
        logger.debug('feature by id : ' + feature);
    });
};

