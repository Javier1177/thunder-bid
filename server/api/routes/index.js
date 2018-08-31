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

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(({ _id }) => {
            const { TOKEN_SECRET, TOKEN_EXP } = process.env

            const token = jwt.sign({ sub: _id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.json({ message: 'user authenticated', token, id: _id})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 401 : 500).json({ message })
        })
})

//Show product by id
router.get('/product/:productId',  (req, res) =>{
    const { params: { productId} } = req

    return logic.retrieveProduct(productId)
        .then(product => {
            res.status(200).json({ data: product})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show user by id
router.get('/user/:userId',  (req, res) =>{
    const { params: { userId} } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200).json({ data: user})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show bidded products of a user
//JWT NOT WORKING
router.get('/user/bidded/:userId', validateJwt, (req, res) => {
    const { params: { userId } } = req

    return logic.listUserBiddedProducts(userId)
        .then(products => {
            res.status(200).json({ status: 'OK', data: products })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show wished products of a user
//JWT NOT WORKING
router.get('/user/wishes/:userId', validateJwt, (req, res) => {
    const { params: { userId } } = req

    return logic.listUserWishes(userId)
        .then(products => {
            res.status(200).json({ status: 'OK', data: products })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

module.exports = router