const express = require('express');

const authRoutes = require('./routes/auth-route');
const app = express();

app.use(authRoutes); //Check for every incoming request

app.listen(3000);