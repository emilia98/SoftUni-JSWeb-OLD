const isAdministarted = require('../middlewares/administration').isAdministrated;
const router = require('express').Router();
const Country = require('../models/Country');

const qs = require('querystring');
const url = require('url');

router.get('/', async (req, res) => {

    let query = qs.parse(url.parse(req.url).query).query ;
   
    let searchable = {};

    if(query.length > 0) {
        searchable = {
            name: query
        };
    }

    let countries = await Country.find();
    countries = countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

    let countriesAsResult = [];

    for(let country of countries) {
        let countryName = country.name.toLowerCase();

        if(countryName.includes(query.toLowerCase())) {
            let currentCountry = {
                id: country._id,
                displayName: country.abbreviatedName,
                isoCode: country.isoCode
            };

            countriesAsResult.push(currentCountry);
        }
    }

    console.log(countriesAsResult);

    res.status(200).json(countriesAsResult);
});


module.exports = router;
