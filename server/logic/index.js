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

    listUserBids(email){
        return Promise.resolve()
            .then(() => {
               validate._validateEmail(email)

                return User.findOne({ email }).populate('bidded')
            })
            .then(user => {
                if(!user) throw new Error(`user ${email} does not exist`)

                return user.bidded
            })
    },

    listUserWishes(email){
        return Promise.resolve()
            .then(() => {
               validate._validateEmail(email)

                return User.findOne({ email }).populate('wishes')
            })
            .then(user => {
                if(!user) throw new Error(`user ${email} does not exist`)
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
    }

}

module.exports = { logic }