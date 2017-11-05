const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

const {
    app
} = require('../server');
const express = require('express');

describe('index page', function () {
    it('should show status 200', function (done) {
        chai.request(app).get('/').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
});
