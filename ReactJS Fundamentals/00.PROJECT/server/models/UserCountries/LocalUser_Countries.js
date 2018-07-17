const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userCountriesSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    visited: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Country',
            default: []
    }],
    toVisit: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Country',
        default: []
    }],
    // CURRENTLY VISITED
    hearted: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Country',
        default: []
    }]
});

const LocalUserCountries = mongoose.model('LocalUser_Countries', userCountriesSchema);

module.exports = LocalUserCountries;
