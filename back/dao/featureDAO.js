const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Feature = require('../models/FeatureModel');
const Animal = require('../models/AnimalModel');
const requestParser = require('../transport/requestParser');

module.exports = {

    getAllFeatures: (res) => {
        Feature.find((err, features) => {
            if (err)
                res.send(err);
            res.json(features);
            logger.debug('features : ' + features);
        });
    },

    getFeatureById: (req, res) => {
        let featureId;

        try {
            featureId = mongoose.Types.ObjectId(req.params.featureId);
        } catch (err) {
            res.json([]);
            logger.debug('feature by id : ' + req.params.featureId);
            return;
        }

        const query = {'_id': featureId};

        Feature.findOne(query).populate('animals').exec((err, feature) => {
            if (err) {
                res.send({error: err.message});
                logger.error(err);
                return;
            }

            res.json(feature);
            logger.debug('feature by id : ' + feature);
        });
    },

    getFeatureByName: (req, res) => {
        const query = {'name': {'$regex': req.params.featureName}};
        Feature.find(query).exec((err, features) => {
            if (err) {
                res.send({error: err.message});
                logger.error(err);
                return;
            }
            res.json(features);
            logger.debug('features by name : ' + features);
        });
    },

    createFeature: (req, res) => {
        Feature.create({name: req.body.name}, (err, feature) => {
            if (err) {
                res.send({error: err.message});
                logger.error(err);
                return;
            }
            res.json(feature);
            logger.debug('new feature has been created: ' + feature);
        });
    },

    getFeatureThatMostPrevalent: (req, res) => {
        let excludeFeaturesId = requestParser.getData(req, 'excludeFeatures');

        Animal.aggregate(
            [
                {
                    $match: {
                        "features": {$nin: excludeFeaturesId}
                    }
                },
                {
                    $unwind: {
                        path: "$features"
                    }
                },
                {
                    $group: {
                        _id: "$features",
                        count: {$sum: 1}
                    }
                },
                {
                    $lookup: {
                        from: "feature",
                        localField: "_id",
                        foreignField: "_id",
                        as: "feature",
                    }
                },
                {
                    $unwind: {
                        path: "$feature"
                    }
                },
                {
                    $project: {name: "$feature.name", count: "$count"}
                },
                {
                    $sort: {count: -1}
                },
                {
                    $limit: 100
                }
            ],
            (err, features) => {
                if (err) {
                    logger.error(err);
                    res.json({error: err.message});
                } else {
                    logger.debug('prevalent feature : ' + JSON.stringify(features));
                    res.json(features);
                }
            }
        );
    }
};
