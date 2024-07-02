var express = require('express');
var router = express.Router();
var alunos = require('../tests/mocks/alunos.json');

/* GET home page. */
router.get('/', function (_req, res, next) {
    const data = {
        title: 'Alunos', 
        alunos: alunos
    };

    res.render('list', data);
});
module.exports = router;