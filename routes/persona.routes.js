const {Router} = require('express');
const personas = require('../controllers/personas.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/personas/:id?')
    .get(verifyToken,personas.get)
    .put(verifyToken,personas.put);

router.route('/personas/')
    .post(personas.post);

router.route('/personas/signIn')
    .post(personas.signIn);

router.route('/personas/')
    .delete(verifyToken,personas.delete);

module.exports = router;