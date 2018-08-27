'use strict'

const { Auction, Product, User, Category } = require('../models')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/thunder-bid', { useNewUrlParser: true })
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => {
        console.log('connected')
    })
    .then( async () => {

        const category1 = new Category({ categoryName: 'Marvel' })
        const category2 = new Category({ categoryName: 'Music' })
        

        const user1 = new User({ email: 'javi@gmail.com', password: '123', role: 'client', name: 'Javi', surname: 'Lopez', wish:[], products: [] })
        const user2 = new User({ email: 'bernat@gmail.com', password: '123', role: 'client', name: 'Bernat', surname: 'Casasus', wish:[], products: [] })
                
        const auction1 = new Auction({ price: 1000, date: Date.now(), user: user1 })
        const auction2 = new Auction({ price: 2000, date: Date.now(), user: user2 })


        const product1 = new Product({ 
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, whit all the infinit stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            currentPrice: 900,
            actualUser: user2,
            currentAuction: auction2,
            closed: false,
            image: 'https://ae01.alicdn.com/kf/HTB1g9M7qYsTMeJjy1zbq6AhlVXaU/Perfect-Type-PVC-Marshmello-Helmet-Marshmello-Mask-Disc-Jockey-Concert-Props-Marshmello-Music-Fans-Prop-Pub.jpg',
            userWining: null,
            auctionWining: null,
            category: category1,
            auction: [auction1, auction2]
        })

        const product2 = new Product({ 
            title: 'Marshmello head',
            description: 'It has a medium size. Original merchandise.',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 200,
            currentPrice: 500,
            actualUser: user1,
            currentAuction: auction1,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            userWining: null,
            auctionWining: null,
            category: category2,
            auction: [auction1]
        })
        
        await Promise.all([
            user1.save(),
            user2.save(),
        ])

        await Promise.all([
            category1.save(),
            category2.save(),
        ])

        await Promise.all([
            product1.save(),
            product2.save(),
        ])

    })
    .then(() => console.log('done'))
    .catch(err => console.log(err))
    .then(() => mongoose.disconnect())