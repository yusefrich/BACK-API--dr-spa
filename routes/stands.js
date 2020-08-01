const express = require('express');
const router = express.Router();

router.get('/' ,(req, res, next) => {
    res.status(200).send({
        mensagem: "get em stand"
    })
});

router.post('/' ,(req, res, next) => {
    const stand = {
        nome: req.body.nome,
        tamanho: req.body.tamanho,
        estilo: req.body.estilo,
    }

    res.status(201).send({
        mensagem: "stand criado com sucesso",
        stand: stand
    })
});
router.get('/:id_stands' ,(req, res, next) => {
    const id = req.params.id_stands;
    res.status(200).send({
        mensagem: "retornar stand exclusivo",
        id: id
    })
});
router.patch('/:id_stands' ,(req, res, next) => {
    const id = req.params.id_stands;
    res.status(201).send({
        mensagem: "retornar editado stand exclusivo",
        id: id
    })
});
router.delete('/:id_stands' ,(req, res, next) => {
    const id = req.params.id_stands;
    res.status(201).send({
        mensagem: "exclui stand exclusivo",
        id: id
    })
});



module.exports = router;