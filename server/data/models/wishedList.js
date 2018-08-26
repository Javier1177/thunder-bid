'use strict'

const mongoose = require('mongoose')
const { WishedList } = require('./schemas')

module.exports = mongoose.model('WishedList', WishedList)