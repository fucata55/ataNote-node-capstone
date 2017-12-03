const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');
const mongoose = require('mongoose');

const {
    app,
    runServer,
    closeServer
} = require('../server');
const express = require('express');

const {
    User,
    Note
} = require('../models');

const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);

const usermame = 'demo'

//Define functions
function generateUser() {
    return {
        firstName: faker.random.first_name(),
        lastName: faker.random.last_name(),
        email: faker.internet.email(),
        username: username,
        password: faker.lorem.words()
    }
}

function generateNote() {
    return {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        type: 'public',
        username: username
    }
}

function seedNote() {
    console.info('Seeding notes');
    const notes = [];
    for (let i = 0; i < 10; i++) {
        notes.push(generateNote())
    }
    return Note.insertMany(notes)
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDataBase();
}



describe('ataNote APIs', () => {
    before(() => {
        return runServer(TEST_DATABASE_URL)
            .then(console.log('running server'))
            .catch(err => console.log({
                err
            }));
    });
    beforeEach(() => {
        return seeNote();
    });
    describe('GET users endpoint', () => {
        it('should return all users in db', () => {
            let res;
            return chai.request(app)
                .get('/users')
                .then((_res) => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.length.of.at.least(1);
                });
        });
    });
    afterEach(() => {
        return tearDownDb();
    });
    after(() => {
        return closeServer();
    });
});
