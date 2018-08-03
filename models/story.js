"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const storySchema = new mongoose.Schema({
    storyTitle: {
        type: String,
        required: true
    },
    storyContent: {
        type: String,
        required: true
    },
    storyLocation: {
        type: String,
        required: true
    },
    storyAuthor: {
        type: String,
        required: true
    },
    storyDate: {
        type: Date,
        required: true
    },
    signedInUserName: {
        type: String,
        required: false
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;