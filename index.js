const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index.js');
var app = express();
var port =5555;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
router(app);
//solo editando
//solo editando
app.listen(port)

console.log('escuchando')


