const FeatureDAO = require(global.__base + 'dao/featureDAO');

module.exports = (app) => {

	// get all Features
	app.get('/api/features', (req, res) => {
		FeatureDAO.allFeatures(res);
	});

	// get Features count
	app.get('/api/features/count', (req, res) => {
		FeatureDAO.featuresCount(res);
	});

	// get Feature by id
	app.get('/api/features/:feature_id', (req, res) => {
		FeatureDAO.feature(req, res);
	});
};
