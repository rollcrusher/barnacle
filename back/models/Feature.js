let mongoose = require('mongoose');

const featureSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        animals: [{ type : mongoose.Schema.Types.ObjectId, ref: 'animal' }]
    },
    {collection: 'feature'});

featureSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model('Feature', featureSchema);
