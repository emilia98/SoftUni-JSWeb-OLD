//let userRouter = require('./user');
let userController = require('../controllers/user');
let countryController = require('../controllers/country');
const multer = require('multer');

module.exports = (app) => {
    //app.use('/user', userRouter);
    app.get('/', (req, res) => {
        console.log();
        let userObj = {};
        userObj.hasUser = false;

        if (req.user) {
            userObj.hasUser = true;
            userObj.picture = req.user.profilePicture;
        }
        // console.log('uSER:');
        // console.log(req.user);
        console.log(req.cookies);
        res.render('home', userObj);
    });

    app.route('/user/register')
    .get((req, res) => {
        res.render('user/register');
    })
    .post(userController.registerPost);

    /*
    app.route('/user/login')
    /*.get((req, res) => {
        res.render('user/login');
    })
    .post(userController.loginPost);
    */

    app.route('/user/activate/:id')
    .get((req, res) => {
        res.render('user/activate', {
            id: req.params.id
        });
    })
    .post(userController.activatePost);

    app.route('/country/new')
    .get((req, res) => {
        res.render('data')
    })
    .post( 
        countryController.allCountries
    );
};
