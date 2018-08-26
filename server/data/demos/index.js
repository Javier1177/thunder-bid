'use strict'

require('dotenv').config()

const { Auction, Product, User, WishedList } = require('../models')
const { mongoose } = require('../../data')

const { env: { MONGO_URL } } = process

mongoose.connect(MONGO_URL)
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => {
        
    })