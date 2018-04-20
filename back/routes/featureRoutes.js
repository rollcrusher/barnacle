const FeatureDAO = require('../dao/featureDAO');

module.exports = (app) => {

	app.get('/api/features/list', (req, res) => {
		FeatureDAO.getAllFeatures(res);
	});

	app.get('/api/features/:feature_id', (req, res) => {
		FeatureDAO.getFeatureById(req, res);
	});
};
