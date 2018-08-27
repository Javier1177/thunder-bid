'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    categoryName: {
        type: String,
        required: true
    }
})