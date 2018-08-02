"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const entrySchema = new mongoose.Schema({
    entryType: {
        type: String,
        required: false
    },
    inputDate: {
        type: Date,
        required: false
    },
    inputPlay: {
        type: String,
        required: false
    },
    inputAuthor: {
        type: String,
        required: false
    },
    inputRole: {
        type: String,
        required: false
    },
    inputCo: {
        type: String,
        required: false
    },
    inputLocation: {
        type: String,
        required: false
    },
    inputNotes: {
        type: String,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;