const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const toVisitCountrySchema = mongoose.Schema({
  countryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Country'
  },
  users_local: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: []
  }],
  users_google: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'UserGoogle',
    default: []
  }],
  users_facebook: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'UserFacebook',
    default: []
  }]
});

const ToVisitCountry = mongoose.model('ToVisit_Country', toVisitCountrySchema);

module.exports = ToVisitCountry;
