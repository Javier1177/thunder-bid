'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Wish = require('./wish')

module.exports = new Schema({
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['administrator', 'client']
    },

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    wishedList: [Wish],

    products:[{
        ref: 'Product',
        type: ObjectId,
    }]

})