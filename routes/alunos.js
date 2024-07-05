var express = require("express");
var router = express.Router();
var alunos = require("../tests/mocks/alunos.json");
/* GET home page. */
router.get("/", function (req, res, next) {
    const data = {
        title: "Alunos",
        alunos: alunos,
    };
    res.render("list", data);
});
router.get("/new", function (req, res, next) {
    res.render("form", { title: "Novo Aluno", buttonText: "Adicionar Aluno" });
});
router.get("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];
    res.render("card", { title: "Detalhe do Aluno", aluno });
});
router.get("/new", function (req, res, next) {
    res.render("form", { title: "Novo Aluno", buttonText: "Adicionar Aluno" });
});
router.get("/edit/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];
    res.render("form", { title: "Editar Aluno", buttonText: "Salvar Alterações", aluno });
});

router.put('/', function (req, res, next) {
    
    res.send(rq.body);
});


router.delete('/', function (req, res, next) {
    
    res.send(rq.body);
});





router.post('/create', function (req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)        
    };

    res.redirect(303, '/alunos');
});



module.exports = router;