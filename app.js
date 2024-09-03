const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth-route');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) //Path to views folder

app.use(authRoutes); //Check for every incoming request

app.listen(3000);