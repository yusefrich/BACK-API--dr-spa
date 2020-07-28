var express = require('express');
var app = express();

app.get('/', function (req, res) {
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
});