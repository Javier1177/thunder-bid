'use strict'

const mongoose = require('mongoose')
const { Auction } = require('./schemas')

module.exports = mongoose.model('Auction', Auction)