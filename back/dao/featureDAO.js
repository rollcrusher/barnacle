const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Feature = require('../models/FeatureModel');

module.exports.getAllFeatures = (res) => {
    Feature.find((err, features) => {
        if (err)
            res.send(err);
        res.json(features);
        logger.debug('features : ' + features);
    });
};

module.exports.getFeatureById = (req, res) => {
    let featureId;

    try {
        featureId = mongoose.Types.ObjectId(req.params.featureId);
    } catch (err) {
        res.json([]);
        logger.debug('feature by id : ' + req.params.featureId);
        return;
    }

    const query = {"_id": featureId};

    Feature.findOne(query).populate('animals').exec((err, feature) => {
        if (err) {
            res.send({error: err.message});
            logger.error(err);
            return;
        }

        res.json(feature);
        logger.debug('feature by id : ' + feature);
    });
};

module.exports.getFeatureByName = (req, res) => {
    const query = {"name":  {'$regex': req.params.featureName}};
    Feature.find(query).exec((err, features) => {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(features);
        logger.debug('features by name : ' + features);
    });
};

module.exports.createFeature = (req, res) => {
    Feature.create({name: req.body.name}, (err, feature) => {
        if (err) {
            res.send(err);
            logger.error(err);
        }
        res.json(feature);
        logger.debug('new feature has been created: ' + feature);
    });
};
