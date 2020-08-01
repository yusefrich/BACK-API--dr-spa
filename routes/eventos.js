const express = require('express');
const router = express.Router();

router.get('/' ,(req, res, next) => {
    res.status(200).send({
        mensagem: "get em eventos"
    })
});

router.post('/' ,(req, res, next) => {
    const evento = {
        nome: req.body.nome,
        data_inicio: req.body.data_inicio,
        data_termino: req.body.data_termino,
    }
    res.status(201).send({
        mensagem: "Evento criado com sucesso",
        evento: evento
    })
});
router.get('/:id_evento' ,(req, res, next) => {
    const id = req.params.id_evento;
    res.status(200).send({
        mensagem: "retornar evento exclusivo",
        id: id
    })
});
router.patch('/:id_evento' ,(req, res, next) => {
    const id = req.params.id_evento;
    res.status(201).send({
        mensagem: "retornar editado evento exclusivo",
        id: id
    })
});
router.delete('/:id_evento' ,(req, res, next) => {
    const id = req.params.id_evento;
    res.status(201).send({
        mensagem: "exclui evento exclusivo",
        id: id
    })
});



module.exports = router;