'use strict';

const mongoose = require('mongoose');
const faker = require('faker');
const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const { FlightLog } = require('../models/flightlog');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);
const should = chai.should();

function seedTestDB() {
    console.info('seeding flight log database with test data');
    const seedData = [];
    for (let x = 1; x <= 10; x++) {
        seedData.push({
            author: 'demo',
            country: faker.address.country(),
            city: faker.address.city(),
            date: { start: faker.date.past(), end: faker.date.future() },
            duration: faker.commerce.price()
        });
    };
    return FlightLog.insertMany(seedData);
}

function dropTestDB() {
    console.warn('Dropping test database');
    return mongoose.connection.dropDatabase();
}

describe("FlightLog API tests", function () {

    // run server before running tests
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    // seed database with fake data before each test
    beforeEach(function () {
        return seedTestDB();
    });
    // drop fake database after each test
    afterEach(function () {
        return dropTestDB();
    });
    // close server after running tests
    after(function () {
        return closeServer();
    });

    describe('GET endpoints', function () {
        it('should return all plans with GET requests', function () {
            let res;
            let author = 'demo';
            return chai
                .request(app)
                .get(`/flight-plan/${author}`)
                .then(function (_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    return FlightLog.count();
                })
                .then(function (count) {
                    res.body.should.have.lengthOf(count);
                });
        });
    });

    describe('CREATE / POST endpoint', function () {
        it('should create a new log', function () {
            const newLog = {
                author: 'demo',
                country: faker.address.country(),
                city: faker.address.city(),
                date: { start: faker.date.past(), end: faker.date.future() },
                duration: faker.commerce.price()
            };

            return chai.request(app)
                .post('/flight-plan/create')
                .send(newLog)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.id.should.not.be.null;
                    res.body.country.should.equal(newLog.country);
                    res.body.city.should.equal(newLog.city);
                    return FlightLog.findById(res.body.id);
                })
                .then(function (log) {
                    log.country.should.equal(newLog.country);
                    log.city.should.equal(newLog.city);
                })
        });

        describe('PUT endpoint', function () {
            it("should update a log by ID", function () {
                const updatedLog = {
                    country: faker.address.country(),
                    city: faker.address.city(),
                    date: { start: faker.date.past(), end: faker.date.future() },
                    duration: faker.commerce.price()
                };

                return FlightLog.findOne()
                    .then(function (log) {
                        updatedLog.id = log.id;
                        return chai.request(app)
                            .put(`/flight-plan/update/${updatedLog.id}`)
                            .send(updatedLog);
                    })
                    .then(function (res) {
                        res.should.have.status(204);
                        return FlightLog.findById(updatedLog.id);
                    })
                    .then(function (log) {
                        log.country.should.equal(updatedLog.country);
                        log.city.should.equal(updatedLog.city);
                    });
            });
        });

        describe('DELETE endpoints', function () {
            it('should delete a log by ID', function () {
                let deletedLog;
                return FlightLog.findOne()
                    .then(function (log) {
                        deletedLog = log;
                        return chai.request(app)
                            .delete(`/flight-plan/delete/${deletedLog.id}`);
                    })
                    .then(function (response) {
                        response.should.have.status(204);
                        return FlightLog.findById(deletedLog.id);
                    })
                    .then(function (log) {
                        should.not.exist(log);
                    });
            });
        });

    });
});