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

                return true
            })
    },

    updatePassword(email, password, newPassword){
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)
                validate._validateStringField('new password', newPassword)

                return User.findOne({ email })
            })
            .then(user => {
                if(!user) throw new Error(`${email} does not exists`)
                if (user.password !== password) throw new Error('wrong password')   
                if(user.password === newPassword) throw new Error('new password must be different')

                user.password = newPassword
                return user.save()
            })
            .then(() => true)
    },

    listUserBids(userId){
        return Promise.resolve()
            .then(() => {
                const id = userId.toString()
                validate._validateStringField('id user', id)

                return User.findOne({ '_id': id }).populate('bidded')
            })
            .then(user => {
                if(!user) throw new Error(`user does not exist`)

                return user.bidded
            })
    },

    listUserWishes(userId){
        return Promise.resolve()
            .then(() => {
                const id = userId.toString()
                validate._validateStringField('id user', id)

                return User.findOne({ '_id': id }).populate('wishes')
            })
            .then(user => {
                if(!user) throw new Error(`user does not exist`)
                debugger
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
                const id = productId.toString()
                validate._validateStringField('product id', id)

                return Product.find({ '_id': id })
            })
            .then(product => {
                if(!product) throw new Error('product does not exist')
                return product
            })
    },

    retrieveUser(idUser){
        return Promise.resolve()
            .then(() => {
                const id = idUser.toString()
                validate._validateStringField('user id', id)

                return User.find({ '_id': id})
            })
            .then(user => {
                if(!user) throw new Error('user does not exist')
                return user
            })
    },

    addProduct(title, description, initialDate, finalDate, initialPrice, closed, image, category, bids){
        return Promise.resolve()
            .then(() =>{
                validate._validateStringField('title', title)
                validate._validateStringField('description', description)
                validate._validateStringField('initial date', initialDate)
                validate._validateStringField('final date', finalDate)
                validate._validateNumber(initialPrice)
                validate._validateBoolean('closed', closed)
                validate._validateStringField('image', image)
                validate._validateStringField('category', category)


                return Product.create({
                    title,
                    description,
                    initialDate,
                    finalDate,
                    initialPrice,
                    closed,
                    image,
                    category,
                    bids
                })             
            })
    },

    //TODO
    // addBid(productId, userId, price){
    //     return Promise.resolve()
    //         .then(() => {
    //             const idProd = productId.toString()
    //             validate._validateStringField('product id', idProd)
    //             const idUser = userId.toString()
    //             validate._validateStringField('user id', idUser)
    //             validate._validateNumber('price', price)
                
    //             return User.findOne({ '_id' : idUser})
    //                 .then(user => {
    //                     if(!user) throw Error(`no user found with this id`)

    //                     return Product.findOne({ '_id' : idProd})
    //                         .then(productMatch => {
    //                             if(!productMatch)  throw Error(`no product found with id`)
    //                             if(productMatch.closed) throw Error('product closed')
    //                             if(productMatch.price > price) throw Error('the price of the bid is lower')

    //                             const bid = new Bid({ price, date: Date.now(), user: user._id })
    //                             return Product.findByIdAndUpdate(idProd, { $push: {bids: bid}})
    //                         })
    //                 })
    //         })
    // }

}

module.exports = { logic }