// IMPORTAÇÃO
var express = require('express');
var router = express.Router();
const db = require('../../config/config_database');
router.get('/', async function(req,res,next){
    const query = 'SELECT * FROM alunos'
    try {
        const data = await db.any(query)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})
router.get('/:matricula', async function(req,res,next) {
    const {matricula} = req.params.matricula;
    const query = `
    SELECT * 
    FROM alunos 
    WHERE matricula= $1
    `;
const args = [matricula]

    try {
        const data = await db.any(query,matricula)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
// POST
router.post('/', async function(req,res,next){
    const nome = req.body.nome
    const matricula = req.body.matricula
    const email = req.body.email
    const data_nascimento = req.body.data_nascimento
    console.log(req.body)
    const query = `
    INSERT 
    INTO alunos 
    (matricula, nome, email, data_nascimento) VALUES
    ($1, $2, $3, $4)
    `
    const values = [matricula, nome, email, data_nascimento]
    try {
        const data = await db.any(query,values)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})
// PUT
router.put('/:matricula', function (req,res,next) {
    const {matricula} = req.params.matricula;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;
    
    const query = `
    UPDATE alunos
    SET
    nome = $2, email = $3, data_nascimento = $4
    WHERE matricula= $1
    `
    try {
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
});
// DELETE
router.delete('/:matricula', async function (req,res,next) {
    const {matricula} = req.params;
    const query = "DELETE FROM alunos WHERE matricula = $1"
    try {
        const data = await db.none(query, matricula)
        const msg = "Aluno removido!"
        
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error.msg)
    }
});
// EXPORTAÇÃO
module.exports = router;