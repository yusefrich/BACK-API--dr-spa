const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/eventos')
const rotaStands = require('./routes/stands')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors
app.use ((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

//declarando rotas
app.use('/eventos', rotaProdutos);
app.use('/stands', rotaStands);

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});



module.exports = app;
//rotas base do usuario para login e registro
/* app.get('/', function (req, res) {
    res.send('API AR360');
});
app.get('/login', function (req, res) {
    res.send('login do usuario');
});
app.get('/register', function (req, res) {
    res.send('Registro do usuario');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}); */