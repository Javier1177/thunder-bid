const { Product, User, Bid} = require('../data/models')
const { validate } = require('../utils/validate')

const logic = {

    register(email, password, name, surname){
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)
                validate._validateStringField('name', name)
                validate._validateStringField('surname', surname)

                return User.findOne({ email })
            })
            .then( user => {
                if(user) throw new Error(`${email} already exists`)

                return User.create({ email, password, name, surname})
            })
            .then(() => true)
    },

    authenticate(email, password){
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if(!user) throw new Error(`${email} does not exists`)
                if (user.password !== password) throw new Error('wrong password')

                return user
            })
    },

    listUserBiddedProducts(userId){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('id user', userId)

                return User.findOne({ '_id': userId }).populate('bidded')
            })
            .then(user => {
                if(!user) throw new Error(`user does not exist`)
                if(!user.bidded.length) throw new Error('this user did not make any bid')

                return user.bidded
            })
    },

    listUserWishes(userId){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('id user', userId)

                return User.findOne({ '_id': userId }).populate('wishes')
            })
            .then(user => {
                if(!user) throw new Error(`user does not exist`)
                if(!user.wishes.length) throw new Error('this user did not add any wish')
                
                return user.wishes
            })
    },

    listProducts(query, category){
        return Promise.resolve()
            .then(() => {
                let filter = {}

                if(query){
                    validate._validateQueryString('query', query)

                    filter.title =  {
                        $regex: query,
                        $options: 'i'
                    }
                }
                if(category){
                    validate._validateStringField('category', category)
                    filter.category = category
                } 

                return Product.find(filter, { __v: 0, _id: 0}, {
                    sort: {
                        finalDate: 1
                    }
                })
                .then(products => {
                    if(!products.length) throw new Error(`products not found`)
                    return products
                })
            })
    },

    retrieveProduct(productId){
        return Promise.resolve()
            .then(() =>{
                validate._validateStringField('product id', productId)

                return Product.findOne({ '_id': productId })
            })
            .then(product => {
                if(!product) throw new Error('product does not exist')

                delete product._id

                return product
            })
    },

    retrieveUser(idUser){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('user id', idUser)
            
                return User.findOne({ '_id': idUser}, { __v: 0, _id: 0})
            })
            .then(user => {
                if(!user) throw new Error('user does not exist')

                delete user._id

                return user
            })
    },

    addBid(productId, userId, price){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)
                validate._validateNumber(price)
                return User.findOne({ '_id' : userId})
                    .then(user => {
                        if(!user) throw Error(`no user found with this id`)
                        
                        return Product.findOne({ '_id' : productId})
                            .then(productMatch => {   
                                if(!productMatch)  throw Error(`no product found with id`)
                                if(productMatch.closed) throw Error('product closed')
                                let minPrice
                                if(productMatch.bids.length) minPrice = productMatch.bids[productMatch.bids.length - 1].price
                                else minPrice = productMatch.initialPrice
                                if(minPrice >= price) throw Error('the price of the bid should be higher than the current price')
    
                                const bid = new Bid({ price, date: Date.now(), user: userId })

                                return Product.findByIdAndUpdate(productId, { $push: {bids: bid}})
                                    .then(() => {
                                        user.bidded.push(productId)
                                        return user.save()
                                    })
                            })
                            .then(() => true)
                    })
            })
    },

    addWish(productId, userId){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)

                return User.findOne({ '_id' : userId})
                    .then(user => {
                        if(!user) throw Error(`no user found with this id`)

                        return Product.findOne({ '_id' : productId})
                            .then(productMatch => {
                                if(!productMatch)  throw Error(`no product found with id`)
                                if(productMatch.closed) throw Error('product closed')
                                if(user.wishes.indexOf(productMatch._id) != -1) throw Error('you cannot add a product twice to de wish list')
                                user.wishes.push(productMatch._id)
                                return user.save()
                            })
                            .then(() => true)
                        })
            })
    },

    deleteWish(productId, userId){
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)

                return User.findOne({ '_id' : userId})
                    .then(user => {
                        if(!user) throw Error(`no user found with this id`)
                        return Product.findOne({ '_id' : productId})
                            .then(productMatch => {
                                if(!productMatch)  throw Error(`no product found with id`)
                                if(user.wishes.indexOf(productId) < 0) throw Error('you cannot delete a product that is not in your wish list')
                                
                                let idPosition = user.wishes.indexOf(productId)
                                user.wishes.splice(idPosition,1)
    
                                return user.save()
                            })
                            .then(() => true)
                        })
            })
    }

}


module.exports = { logic }