const mongoose = require('mongoose');
const validations = require('./validations/country');
mongoose.Promise = global.Promise;

const countryInfoSchema = mongoose.Schema({
    countryId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
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
    }
});

const CountryInfo = mongoose.model('CountryInfo', countryInfoSchema);

module.exports = CountryInfo;
