'use strict';

// declare and use chai, a js assertion library
const chai = require("chai");
// declare and use chai-http, a plugin for chai
// for integration testing external apis
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// declare and use should interface
const should = chai.should();
// declare and import app, runServer, and closeServer
const {app, runServer, closeServer} = require("../server");


describe("Server is running", function() {
    
    //run server before running tests
    before(function() {
        return runServer();
    })
    //close server after running tests
    after(function() {
        return closeServer();
    })

    it("should return a response", function() {
        return chai
        .request(app)
        .get("/")
        .then(function(res){
            res.should.have.status(200);
        })
    })
    it("should display html file", function() {
        return chai
        .request(app)
        .get("/")
        .then(function(res) {
            res.should.be.html;
        })
    })
})