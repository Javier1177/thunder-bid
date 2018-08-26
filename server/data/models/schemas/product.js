'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const auction = require('./auction')


module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    initialDate: {
        type: Date,
        required: true
    },

    finalDate: {
        type: Date,
        required: true
    },

    initialPrice: {
        type: Number,
        required: true
    },

    currentPrice: {
        type: Number,
        required: true
    },

    actualUser: {
        ref: 'User',
        type: ObjectId
    },

    currentAuction: {
        ref: 'Auction',
        type: ObjectId
    },

    closed: {
        type: Boolean
    },

    image: {
        type: String
    },

    userWining: {
        ref: 'User',
        type: ObjectId
    },

    auctionWining: {
        ref: 'Auction'
    },

    auntion: [auction]
})