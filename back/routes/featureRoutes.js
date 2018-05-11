const FeatureDAO = require('../dao/featureDAO');

module.exports = (app) => {

    app.get('/api/features/search/all', (req, res) => {
        FeatureDAO.getAllFeatures(res);
    });

    app.get('/api/features/search/id/:featureId', (req, res) => {
        FeatureDAO.getFeatureById(req, res);
    });

    app.get('/api/features/search/name/:featureName', (req, res) => {
        FeatureDAO.getFeatureByName(req, res);
    });

    app.put('/api/features/create', (req, res) => {
        FeatureDAO.createFeature(req, res);
    });
};
