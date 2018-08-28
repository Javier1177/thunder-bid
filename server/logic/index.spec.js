'use strict'
require ('dotenv').config()


const { logic } = require('.')
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
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
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
            logic.register(undefined, password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space as email', () =>
            logic.register(' ', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the start of the email', () =>
        logic.register(' '+email, password, name, surname)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the end of the email', () =>
        logic.register(email+' ', password, name, surname)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space as password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the begining of the password', () =>
            logic.register(email, ' '+password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the end of the password', () =>
            logic.register(email, password+' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )


        it('should fail on trying to register with an undefined name', () =>
        logic.register(email, password, undefined, surname)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.register(email, password, '', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.register(email, password, 123, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space as name', () =>
            logic.register(email, password, ' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space at the begining of the name', () =>
            logic.register(email, password, ' '+name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space at the end of the name', () =>
            logic.register(email, password, name+' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )


        it('should fail on trying to register with an undefined surname', () =>
            logic.register(email, password, name, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with an empty surname', () =>
            logic.register(email, password, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a numeric surname', () =>
            logic.register(email, password, name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space as surname', () =>
            logic.register(email, password, name, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space at the begining of the surname', () =>
            logic.register(email, password, name, ' '+surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space at the end of the surname', () =>
            logic.register(email, password, name, surname+' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

    })

    describe('login', () =>{
        const notExistingEmail = 'jlb@gmail.com', incorrectPassword = '123456'

        beforeEach(() => User.create({ email, password, name, surname }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a username', () =>
            logic.authenticate('jlb', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a space as email', () =>
            logic.authenticate(' ', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a not existing email', () =>
            logic.authenticate(notExistingEmail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${notExistingEmail} does not exists`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login without a string as a password', () =>
            logic.authenticate(email, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to login with an incorrect password', () =>
        logic.authenticate(email, incorrectPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('wrong password'))
    )

    })

    describe('update password', () => {
        const newPassword = '123456'
        const notExistingEmail = 'jlb@gmail.com'

        beforeEach(() => User.create({ email, password, name, surname }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update a password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update a password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update a password with a new pasword starting with a space', () =>
            logic.updatePassword(email, password, ' '+newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update a password with a new pasword ending with a space', () =>
            logic.updatePassword(email, password, newPassword+' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update a password with a space as a new password', () =>
            logic.updatePassword(email, password, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update a password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on trying to update password with the same password', () =>
            logic.updatePassword(email, password, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('new password must be different'))
        )

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with a space as email', () =>
            logic.updatePassword(' ', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with an email that starts with space', () =>
            logic.updatePassword(' '+email, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with an email that starts with space', () =>
            logic.updatePassword(email+' ', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to update password with an email that does not exist', () =>
            logic.updatePassword(notExistingEmail, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${notExistingEmail} does not exists`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to update password with a space as a password', () =>
            logic.updatePassword(email, ' ', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to update password with a password that starts with space', () =>
            logic.updatePassword(email, ' '+password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to update password with a password that ends with space', () =>
            logic.updatePassword(email, password+' ', newPassword)
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