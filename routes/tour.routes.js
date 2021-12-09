const {Router} = require('express');
const tours = require('../controllers/tours.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/tours/:id?')
    .get(verifyToken,tours.get)

module.exports = router;