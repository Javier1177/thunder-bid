'use strict'
require ('dotenv').config()


const { expect } = require('chai')
const { validate } = require('.')

describe('validation logic', () => {
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

    describe('validate email', () => {

        it('should succed on correct values', () => {
            expect(() => validate._validateEmail(email).to.equal(email))
        })

        it('should fail on undefined email', () => {
            expect(() => validate._validateEmail(undefined)).to.throw(`invalid email`)
        })

        it('should fail on empty email', () => {
            expect(() => validate._validateEmail('')).to.throw(`invalid email`)
        })

        it('should fail on numeric email', () => {
            expect(() => validate._validateEmail(123)).to.throw(`invalid email`)
        })

        it('should fail on space email', () => {
            expect(() => validate._validateEmail(' ')).to.throw(`invalid email`)
        })

        it('should fail on a email starting with space', () => {
            expect(() => validate._validateEmail(' 123')).to.throw(`invalid email`)
        })

        it('should fail on a email ending with space', () => {
            expect(() => validate._validateEmail('123 ')).to.throw(`invalid email`)
        })

        it('should fail on a email with space between words', () => {
            expect(() => validate._validateEmail('1 2 3')).to.throw(`invalid email`)
        })
    })
})