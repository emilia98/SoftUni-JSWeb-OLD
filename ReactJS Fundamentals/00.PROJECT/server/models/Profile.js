const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const profileSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    userGoogleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGoogle',
        default: null
    },
    userFacebookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserFacebook',
        default: null
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    birthdate: {
        type: mongoose.Schema.Types.Date,
        default: null
    },
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: null
        // required: true
    },
    Town: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
        // required: true
    },
    isPro: {
        type: Boolean,
        required: true,
        default: false
    },
    profilePicture: {
        type: String,
        default: 'https://i.imgur.com/YKhObkG.jpg'
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          default: []
        }
    ],
    registrationDate: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    }
});

const Profile = mongoose.model('UserProfile', profileSchema);

module.exports = Profile;
/*
UserProfile (for user data)
 -> userId -> pointing to the User (ref="User")
 -> firstName
 -> lastName
 -> birthdate
 -> Country
 -> Town
 -> isPro (false) -> for pro subscribers
 -> profilePicture
 -> comments -> ([ObjectIds] -> ref="Comment")
*/