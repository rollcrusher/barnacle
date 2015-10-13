var FeatureDAO = require('../dao/FeatureDAO');

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
    app.get('/api/Feature/:feature_id', function (req, res) {
        FeatureDAO.feature(req, res);
    });

    // get Features by Feature
    app.get('/api/features', function (req, res) {

    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};