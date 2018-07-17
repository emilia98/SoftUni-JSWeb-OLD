const mongoose = require('mongoose');
const validations = require('./validations/country');

mongoose.Promise = global.Promise;

const countrySchema = mongoose.Schema({
    name: {
        type: String,
        validate: validations.name
    },
    abbreviatedName: {
        type: String,
        validate: validations.abbreviation
    },
    isoCode: {
        type: String,
        validate: validations.code,
        unique: true
    },
    latitude: {
        type: Number,
        default: 0,
        validate: validations.latitude
    },
    longitude: {
        type: Number,
        default: 0,
        validate: validations.longitude
    },
    visitedData: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Visited_Country',
        default: null
    },
    toVisitedData: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ToVisit_Country',
        default: null
    },
    lovedData: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Loved_Country',
        default: null
    },
});

let Country = mongoose.model('Country', countrySchema);

module.exports = Country;
