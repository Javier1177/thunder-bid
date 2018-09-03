require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env

    let email, password

    beforeEach(() => {
        email = `user${Math.random()}@gmail.com`, password = '123', name = `javi-${Math.random()}`, surname = `lopez-${Math.random()}`
    })

    !true && describe('register user', () => {
        it('should register a user correctly', () => 
            logic.register(email, password, name, surname)
                .then(res => expect(res).to.be.true)
        )

        it('should fail at register with an existing user', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.register(email, password, name, surname))               
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${email} already exists`))
        )

        it('should fail on register with an invalid user', () =>
            logic.register('javi', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on register with an empty user', () =>
            logic.register('', password, name, surname)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid email'))
        )

        it('should fail on register with a number as a password', () => 
            logic.register(email, 123, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a space as a password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password starting with space', () =>
            logic.register(email, ' '+password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password ending with space', () =>
            logic.register(email, password+' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

                it('should fail on register with a space as a password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password starting with space', () =>
            logic.register(email, ' '+password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password ending with space', () =>
            logic.register(email, password+' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with an empty name', () =>
            logic.register(email, password, '', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with a space as a number', () =>
            logic.register(email, password, ' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with a number as a number', () =>
            logic.register(email, password, 456, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with an empty surname', () => 
            logic.register(email, password, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on register with a space as a surname', () =>
            logic.register(email, password, name, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on register with a number as a surname', () =>
            logic.register(email, password, name, 456)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )
    })

    !true && describe('login user', () => {
        it('should login a user correctly', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(res => {
                    expect(res.token).to.be.a('string')
                    
                    let payload
                    expect(() => payload = jwt.verify(res.token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(res.id)
                })
        )

        it('should fail on login with a not existing user', () =>
            logic.login(email, password)
                .catch(res => res)
                .then(({ message }) => expect(message).to.equal(`${email} does not exists`))
        )

        it('should fail on login with a user that is not an email', () =>
            logic.login('email', password)
                .catch(res => res)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail with incorrect password', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, '4565464'))
                .catch(res => res)
                .then(({ message }) => {expect(message).to.equal('wrong password')})
        )

        it('should fail with an empty password', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(email, ''))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid password')})
        )
    })
})