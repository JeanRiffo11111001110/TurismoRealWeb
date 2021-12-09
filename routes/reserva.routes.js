const {Router} = require('express');
const reservas = require('../controllers/reservas.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/reservas/:id?')
    .get(verifyToken,reservas.get)
    .post(verifyToken,reservas.post)
    .put(verifyToken,reservas.put);

router.route('/reservas/:id')
    .delete(verifyToken,reservas.delete);

module.exports = router;