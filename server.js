// declare and use express
const express = require('express');

// create an instance of express called 'app'
const app = express();

// tell app to use our static files inside 'public' folder
app.use(express.static('public'));

// app is listening on local port 8080
// process.env.PORT is required for heroku env
app.listen(process.env.PORT || 8080);