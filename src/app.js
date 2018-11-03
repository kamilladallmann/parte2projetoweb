'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const app = express();
const router = express.Router();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));

//Conecta ao banco
mongoose.connect(config.connectionString);

//Carrega os Models
const usersModels = require('./models/users');
const photoModels = require('./models/photos');

//Carrega as Rotas
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const photoRoutes = require('./routes/photos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/photos', photoRoutes);

module.exports = app;