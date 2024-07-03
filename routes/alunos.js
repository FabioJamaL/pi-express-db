var express = require('express');
var router = express.Router();
var alunos = require('../tests/mocks/alunos.json');
const { Button } = require('bootstrap');

/* GET home page. */
router.get('/', function (_req, res, next) {
    const data = {
        title: 'Alunos', 
        alunos: alunos
    };

    res.render('list', data);
});

router.get('/new', function (req, res, next) {


    res.render('form', { title: 'Novo aluno', Buttontext: 'Adicionar aluno', aluno });

});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];

    res.render('card', { title: 'Detalhes do Aluno', aluno });

});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];

    res.render('card', { title: 'Detalhes do Aluno', aluno });
    res.render('form', { title: 'Editar aluno', Buttontext: 'Salvar alterações', aluno });

});

module.exports = router;