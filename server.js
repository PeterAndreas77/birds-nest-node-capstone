// declare and use express
const express = require('express');

// create an instance of express called 'app'
const app = express();

// tell app to use our static files inside 'public' folder
app.use(express.static('public'));

// app is listening on local port 8080
// process.env.PORT is required for heroku env
//app.listen(process.env.PORT || 8080);

//declare the server
let server;
// start the server and return a promise
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app
        .listen(port, ()=> {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        })
        .on("error", err => {
            reject(err);
        })
    })
}
// close the server and return a promise
function closeServer() {
    return new Promise ((resolve, reject) => {
        console.log("server shutdown");
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

if(require.main === module){
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};