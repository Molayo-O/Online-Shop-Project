const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth-route');
const app = express();

app.set('view engine', 'ejs');
//Path to views folder
app.set('views', path.join(__dirname, 'views')) 

//serve public files statically
app.use(express.static('public'));

//Check for every incoming request
app.use(authRoutes); 

app.listen(3000);