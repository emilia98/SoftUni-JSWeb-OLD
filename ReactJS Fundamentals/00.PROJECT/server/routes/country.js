
let router = require('express').Router();
const passport = require('passport');
const isAuthenticated = require('../middlewares/authentication').isAuthenticated;
const Profile = require('../models/Profile');
const LocalUserCountries = require('../models/UserCountries/LocalUser_Countries');
const VisitedCountry = require('../models/Country/VisitedCountry');
const ToVisitCountry = require('../models/Country/ToVisitCountry');
const LovedCountry = require('../models/Country/LovedCountry');
const Country = require('../models/Country');

function checking(req, res, userModel, countryModel, checkingType, userType, list ) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        let countryId = req.params.id;
        let localUser;
        let country;

        try {
            localUser = await userModel.findOne({userId: user._id})
        } catch (err) {
            return res.json({ error: 'Something went wrong!'});
        }

        try {
            country = await countryModel.findOne({countryId: countryId})
        } catch (err) {
            return res.json({ error: 'Something went wrong!'});
        }

        if (country === null) {
            return  res.status(404).json({
                error: `Country doesn't exist!`
            });
        }

        if (localUser === null) {
            return  res.status(404).json({
                error: `This user doesn't exist!`
            });
        }

        if(localUser[checkingType].indexOf(country.countryId) !== -1) {
            return res.status(400).json({
                error: `You have this country already listed in ${list}`
            });
        }

        localUser[checkingType].push(country.countryId);
        country[userType].push(user._id);

        await country.save();
        await localUser.save();

        res.status(200).json({
            message: `Country successfully listed!`
        });
    })(req, res)
}

router.get('/visited/:id', (req, res) => {
    checking(req, res, LocalUserCountries, VisitedCountry, 'visited', 'users_local', 'visited' );
});

router.get('/tovisit/:id', (req, res) => {
    checking(req, res, LocalUserCountries, ToVisitCountry, 'toVisit', 'users_local', 'to visit' );
});

router.get('/liked/:id', (req, res) => {
    checking(req, res, LocalUserCountries, LovedCountry, 'hearted', 'users_local', 'liked' );
});

router.get('/:iso', async (req, res) => {
    let countryName = req.params.iso;

    let country = await Country.findOne({
        isoCode: countryName
    });

    if(country === null) {
        return res.status(404).json({
            error: 'This country does not exist!'
        });
    }

    let modifiedCountry = {
        officialName: country.name,
        isoCode: country.isoCode,
        latitude: country.latitude,
        longitude: country.longitude
    };

    return res.status(200).json({
        country: modifiedCountry
    });

    // console.log(country);
    // console.log(req.params.name);

});



module.exports = router;
