
const express = require('express');
const routes = require('./src/routes');
const morgan = require('morgan');

require('./src/database');

const app = express();

app.use(express.json());
app.use(routes);
app.use(morgan('dev'));

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

app.listen(3333);