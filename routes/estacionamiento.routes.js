const {Router} = require('express');
const estacionamientos = require('../controllers/estacionamientos.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/estacionamientos/:id?')
    .get(verifyToken,estacionamientos.get)

module.exports = router;