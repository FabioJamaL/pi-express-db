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

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];

    res.render('card', { title: 'Detalhes do Aluno', aluno });

});


module.exports = router;