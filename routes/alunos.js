//alunos.js
const { localApi } = require('../config/config_axios')
var express = require('express');
var router = express.Router();
const path = require('path')

const { json } = require('body-parser');
const { title } = require('process');
const { error } = require('console');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const response= await localApi.get('/api/v1/alunos')
        //console.log(response);
        let alunos = response.data;
        let viewData = { title: 'Alunos', alunos };

        res.status(200).render('list' , viewData)
    } catch (error) {
        res.json({msg: error.message});
    }
    // const data = {
    //     title: 'Alunos',
    //     alunos: alunos.content
    // };
    // res.render('list',data)
});
router.get('/new', async function(_req, res, next) {
    
    const viewData = {title: 'Novo aluno', parametro:"create", metodo: "post", buttonText: 'Adicionar aluno'}
    res.render('form', viewData);
});
router.get('/:matricula', async function(req, res, next){
    let matricula = req.params.matricula;
    let apiUrlPath = '/api/v1/alunos/' + matricula;

    try {
        let response = await localApi.get('/api/v1/alunos/' + matricula);
        let aluno = response.data;
        console.log(aluno)
        let viewData = { aluno, title: 'detalhes do aluno'}

        res.status(200).render('card', viewData);
        
    } catch (error) {
        res.json({msg:error.message})
        
    }
});
router.get('/edit/:matricula', async function(req, res, next) {
    const matricula =  req.params;
    const parametro = matricula
    
    const data = {aluno, metodo: "put", parametro, title: "editar aluno", buttonText: "salvar alteraçoes"}
    res.render('form', viewData);
});
router.post('/create', async function(req, res, next) {
    let novoAluno = req.body;
    let apiUrlPath = '/api/v1/alunos';
    
    try {
        await localApi.post(apiUrlPath, data);
        } catch (error) {
            console.error(error.message)
    } finally {
        res.redirect('/alunos');
    }
});
router.put('/:matricula', async function (req, res, next) {
    //const {body, method} = req;
    let matricula = req.params.matricula;
    let apiUrlPath = '/api/v1/alunos' + matricula;

    const data = req.body;
    
    try {
        await localApi.put(apiUrlPath, data);
        
    } catch (error) {
        console.error(error.message)
    }finally {
        res.redirect('/alunos' + matricula);
    }
});
router.delete('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula;
    try {
        await localApi.delete('/api/v1/alunos/' + matricula);

    }catch (error) {
        res.json({msg:error.message})
    } finally {
        res.redirect(303, '/alunos')
    }
});
module.exports = router;