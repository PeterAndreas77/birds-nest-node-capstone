const User = require('./models/user');
const FlightPlan = require('./models/flightplan');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose').set('debug', true);
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/signup', (req, res) => {

    //take the name, username and the password from the ajax api call
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the encrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succesful
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/signin', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {
        //if the there is an error connecting to the DB
        if (err) {
            //display it
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "Not found!"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});

//****************************/
// FLIGHT PLAN ENDPOINTS
//**************************/
//  getting user flight plans from Database
app.get('/flightplan/:user', (req, res) => {
    FlightPlan.find({ author: req.params.user })
        .then(plans => res.json(plans.map(plan => plan.planned())))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// POST - creating new flight plan
app.post('/flightplan/create', (req, res) => {
    const requiredFields = ['country', 'location', 'budget', 'author', 'duration'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    FlightPlan.create({
        country : req.body.country,
        location : req.body.location,
        budget : req.body.budget,
        author : req.body.author,
        duration : req.body.duration
    })
    .then(plans => res.status(201).json(plans.planned()))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});

// PUT --------------------------------------
app.put('/flightplan/:id', (req, res) => {
    let toUpdate = {};
    let updateableFields = ['storyTitle', 'storyContent', 'storyLocation'];
    updateableFields.forEach((field) => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    console.log(toUpdate);
    Story
        .findByIdAndUpdate(req.params.id, { $set: toUpdate }, { new: true })
        .then(updatedStory => res.status(204).end())
        .catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all recent stories
app.get('/stories/recent', function (req, res) {
    Story.find()
        .then(stories => res.json(stories.map(story => story.serialize())))
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});



app.get('/stories/location/:query', function (req, res) {
    Story
        .find({ storyLocation: req.params.query })
        .then(stories => res.json(stories.map(story => story.serialize())))
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

app.get('/entry-performed/:user', function (req, res) {

    Entry
        .find({
            "entryType": "performed"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single achievement by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entries) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting story by id
app.delete('/story/:id', function (req, res) {
    Story.findByIdAndRemove(req.params.id).then(() => {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;