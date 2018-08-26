'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const logic = require('../../logic')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()
const jsonBodyParser = bodyParser.json()

router.post('register', jsonBodyParser, (req, res) => {
    const { body: { user, password } } = req
})