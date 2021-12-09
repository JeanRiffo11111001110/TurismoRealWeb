const {Router} = require('express');
const acompañantes = require('../controllers/acompañantes.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/acompanantes/:id?')
    .get(verifyToken,acompañantes.get)
    .post(verifyToken,acompañantes.post)
    .put(verifyToken,acompañantes.put);

router.route('/acompanantes/:id')
    .delete(verifyToken,acompañantes.delete);

module.exports = router;