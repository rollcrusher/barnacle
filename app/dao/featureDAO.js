const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

// define schema
const mongoose = require('mongoose');
const featureSchema = mongoose.Schema({
	name: String
}, {collection: 'feature'});
const Feature = mongoose.model('feature', featureSchema);

//
module.exports.featuresCount = (resp) => {
	Feature.count({}, (err, count) => {
		if (err) {
			logger.error(err);
		}
		resp.send({featuresCount: count});
		logger.debug('features count : ' + count);
	});
};

module.exports.allFeatures = (res) => {
	Feature.find((err, features) => {
		if (err)
			res.send(err);
		res.json(features);
		logger.debug('features : ' + features);
	});
};

module.exports.feature = (req, res) => {
	let query = Feature.find({
		'_id': req.params.feature_id
	});

	Feature.find(query).exec((err, feature) => {
		if (err) {
			res.send(err);
			logger.error(err);
		}
		res.json(feature);
		logger.debug('feature by id : ' + feature);
	});
};
