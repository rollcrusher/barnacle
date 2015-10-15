var FeatureDAO = require('../dao/featureDAO');

module.exports = function (app) {

    // get all Features
    app.get('/api/features', function (req, res) {
        FeatureDAO.allFeatures(res)
    });

    // get Features count
    app.get('/api/features/count', function (req, res) {
        FeatureDAO.featuresCount(res);
    });

    // get Feature by id
    /*app.get('/api/features/:feature_id', function (req, res) {
        FeatureDAO.feature(req, res);
    });*/



};