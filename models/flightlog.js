"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const flightLogSchema = new mongoose.Schema({
    country: { type: String },
    city: { type: String },
    duration: { type: Number },
    date: { start: String, end: String },
    author: { type: String },
    title: { type: String },
    story: { type: String },
    rating: { type: Number },
    created: { type: Date, default: Date.now() },
    visited: { type: Boolean, default: false }
});

flightLogSchema.methods.planned = function () {
    return {
        id: this._id,
        country: this.country,
        city: this.city,
        date: this.date,
        duration: this.duration,
        created: this.created
    };
};

flightLogSchema.methods.historied = function () {
    return {
        id: this._id,
        country: this.country,
        city: this.city,
        date: this.date,
        duration: this.duration,
        created: this.created,
        title: this.title,
        story: this.story,
        rating: this.rating
    };
};

const FlightLog = mongoose.model('FlightLog', flightLogSchema);

module.exports = FlightLog;