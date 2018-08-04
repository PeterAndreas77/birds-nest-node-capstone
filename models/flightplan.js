"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const flightPlanSchema = new mongoose.Schema({
    country: { type: String },
    location: { type: String },
    duration: { type: Number },
    date: { start: String, end: String },
    author: { type: String },
    title: { type: String },
    story: { type: String },
    rating: { type: Number },
    created: { type: Date, default: Date.now() },
    visited: { type: Boolean, default: false }
});

flightPlanSchema.methods.planned = function () {
    return {
        id: this._id,
        country: this.country,
        location: this.location,
        date: this.date,
        duration: this.duration,
        created: this.created
    };
};

flightPlanSchema.methods.historied = function () {
    return {
        id: this._id,
        country: this.country,
        location: this.location,
        date: this.date,
        duration: this.duration,
        created: this.created,
        title: this.title,
        story: this.story,
        rating: this.rating
    };
};

const FlightPlan = mongoose.model('FlightPlan', flightPlanSchema);

module.exports = FlightPlan;