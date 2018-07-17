const User = require('../../models/User');
let router = require('express').Router();

router.get('/country/:id', (req, res) => {
    // console.log(req.user);
    res.json('Super');
});

module.exports = router;
