'use strict'

const { validate } = require('.')
const { expect } = require('chai')


describe('logic', () => {
    const email= 'javier@gmail.com', password = '123'

    describe('validate fields', () => {
        it('should succed on correct values', () => {
            expect(() => validate._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined password', () => {
            expect(() => validate._validateStringField('password', undefined)).to.throw(`invalid password`)
        })

        it('should fail on empty password', () => {
            expect(() => validate._validateStringField('password', '')).to.throw(`invalid password`)
        })

        it('should fail on numeric password', () => {
            expect(() => validate._validateStringField('password', 123)).to.throw(`invalid password`)
        })

        it('should fail on space password', () => {
            expect(() => validate._validateStringField('password', ' ')).to.throw(`invalid password`)
        })

        it('should fail on a password starting with space', () => {
            expect(() => validate._validateStringField('password', ' 123')).to.throw(`invalid password`)
        })

        it('should fail on a password ending with space', () => {
            expect(() => validate._validateStringField('password', '123 ')).to.throw(`invalid password`)
        })
    })

    //TODO VALIDATEMAIL
})