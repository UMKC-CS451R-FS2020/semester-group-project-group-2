const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import Routes
const usersRoute = require('./routes/users');
const transactionRoute = require('./routes/transactions')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middlewares

app.use('/users', usersRoute);
app.use('/transactions', transactionRoute);

//ROUTES
app.get('/', function(req,res) {
    res.render('index');
});


//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,
{ userNewUrlParser: true }, 
() => console.log('Connected'));


app.listen(3000);

