const {Router} = require('express');
const conjuntos = require('../controllers/conjuntos.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/conjuntos/:id?')
    .get(verifyToken,conjuntos.get)
    .post(verifyToken,conjuntos.post)
    .put(verifyToken,conjuntos.put);

router.route('/conjuntos/:id')
    .delete(verifyToken,conjuntos.delete);

module.exports = router;