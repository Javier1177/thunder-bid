'use strict'
require ('dotenv').config()


const {logic} = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { models: {Product, User, Category, Auction} } = require('../data')


const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email= 'javier@gmail.com', password = '123', role = 'customer', name = 'Javi', surname = 'Lopez', wishedList = [], products = []
    let _connection


    before(() => 
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() => {
        return Promise.all([Product.remove(), User.remove()])
    })

    false && describe('validate fields', () => {
        it('should succed on correct values', () => {
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined password', () => {
            expect(() => logic._validateStringField('password', undefined)).to.throw(`invalid password`)
        })

        it('should fail on empty password', () => {
            expect(() => logic._validateStringField('password', '')).to.throw(`invalid password`)
        })

        it('should fail on numeric password', () => {
            expect(() => logic._validateStringField('password', 123)).to.throw(`invalid password`)
        })

        it('should fail on space password', () => {
            expect(() => logic._validateStringField('password', ' ')).to.throw(`invalid password`)
        })

        it('should fail on a password starting with space', () => {
            expect(() => logic._validateStringField('password', ' 123')).to.throw(`invalid password`)
        })

        it('should fail on a password ending with space', () => {
            expect(() => logic._validateStringField('password', '123 ')).to.throw(`invalid password`)
        })

        it('should fail on a password with space between words', () => {
            expect(() => logic._validateStringField('password', '1 2 3')).to.throw(`invalid password`)
        })
    })

    describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password, name, surname)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user._doc).to.exist
                    expect(user._doc.email).to.equal(email)
                    expect(user._doc.password).to.equal(password)
                    expect(user._doc.name).to.equal(name)
                    expect(user._doc.surname).to.equal(surname)
                    return User.find()
                })
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password, name, surname })
                .then(() => {
                    return logic.register(email, password, name, surname)
                })
                .catch(err => err )
                .then(({ message }) => expect(message).to.equal(`${email} already exists`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space as email', () =>
            logic.register(' ', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the start of the email', () =>
        logic.register(' '+email, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the end of the email', () =>
        logic.register(email+' ', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space as password', () =>
            logic.register(email, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the begining of the password', () =>
            logic.register(email, ' '+password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the end of the password', () =>
            logic.register(email, password+' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )


    })

    after(() => 
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
        .then(() => _connection.disconnect())
    )

})