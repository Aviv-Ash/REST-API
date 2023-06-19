
const express = require('express');
const router = express.Router();

/* GET ABOUT page. */
router.get('/', function(req, res, next) {
    //Shows the programmers info via json file
    res.status(200).json(
        [{"firstname":"Aviv","lastname":"Ashtamker","email":"AvivAshtamker7@gmail.com"}]);

});

module.exports = router;
