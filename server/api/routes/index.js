'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const {logic} = require('../../logic')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()
const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name, surname } } = req

    logic.register(email, password, name, surname)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK'})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

module.exports = router