'use strict'
require ('dotenv').config()


const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Product, User, Category, Auction} = require('../data/models')


const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `javi-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    const _connection
    let usersCount = 0

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() => 
        Promise.all([Product.remove(), User.remove(), Category.remove()])
    )
    .then(() => {
        let count = Math.floor(Math.random() * 100)

        const creations = []

        while (count--) creations.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

        if (usersCount = creations.length)
            return User.create(creations)
    })
})