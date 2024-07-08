var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json')
/* GET users listing. */
router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    };
    res.render('list',data)
});
router.get('/new', function(_req, res, next) {
    const{heads: labels} = alunos;
    const data = {title: 'Novo aluno', parametro:"create", metodo: "post", buttonText: 'Adicionar aluno'}
    res.render('form', data);
});
router.get('/:matricula', function(req, res, next) {
    const {matricula} =  req.params;
    const aluno = alunos.content[matricula];
    res.render('card',{title:'Detalhe dos alunos', aluno})
});
router.get('/edit/:matricula', function(req, res, next) {
    const {matricula} =  req.params;
    const parametro = matricula
    const aluno = alunos.content[matricula];
    const data = {aluno, metodo: "put", parametro:"create", title: "editar aluno", buttonText: "salvar alteraçoes"}
    res.render('form', data);
});
router.post('/', function (req, res, next) {
    const {body, method} = req;
    res.send({body, method});
});
router.post('/creat', function(req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };
    res.redirect('/alunos');
});
router.put('/matricula', function (req, res, next) {
    const {body, method} = req;
    res.send({body, method, msg:'altera usuario'});
});
router.delete('/', function (req, res, next) {
    const {body, method} = req;
    res.send({body, method, msg:'remover o aluno'});
});
module.exports = router;