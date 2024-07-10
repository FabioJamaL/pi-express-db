const db = require('../../config/config_database');
//const router = require('express').Router();

let alunos = require('../../tests/mocks/alunos.json')

var express = require('express');
var router = express.Router();

//http://localhost:3000/api/v1/alunos

router.get('/', async function(req, res, next) {
    const query = 'SELECT * FROM alunos';

    try {
        const data = await db.any(query);
        res.status(200).json(data);
    }catch (error) {
        res.status(400).json({ msg:error.message });
    }
});

router.get('/:matricula', function(req, res, next) {
    const matricula =  req.params.matricula;
    const query = `
    SELECT * 
    FROM alunos 
    WHERE matricula = $1`
    ;

    try{
        const aluno = alunos.content[matricula];
        res.status(200).json(aluno);
    }catch (error) {
        res.status(400).json({msg: error.message});
    } 
});
router.get('/edit/:matricula', function(req, res, next) {
    const {matricula} =  req.params;
    const parametro = matricula
    const aluno = alunos.content[matricula];
    const data = {aluno, metodo: "put", parametro, title: "editar aluno", buttonText: "salvar alteraçoes"}
    res.render('form', data);
});
router.post('/', async function(req, res, next) {
    const query = `
    INSERT  
    INTO alunos (matricula, nome, email, data_nascimento)
    VALUES ($1, $2, $3, $4)`
    ;

    const novoAluno = req.body;
    //const matricula = novoAluno.matricula;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };
    res.redirect(303, '/alunos');
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;

});
router.put('/:matricula', async function (req, res, next) {
    //const {body, method} = req;
    
    const query = `
    UPDATE alunos
    SET nome=$2, email=$3, data_nascimento=$4,
    WHERE matricula=$1
    `;
    const { matricula } = req.params;
    const novoAluno = req.body;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    };

    //res.send({body, method, msg:'altera usuario'});
    res.redirect('/alunos');
});
router.delete('/:matricula', function (req, res, next) {
    const query = `
    DELETE
    FROM alunos
    WHERE matricula = 1
    `;
    const matricula = req.params.matricula;

    delete alunos.content[matricula];

    res.redirect(303, '/alunos');
    
});
module.exports = router;