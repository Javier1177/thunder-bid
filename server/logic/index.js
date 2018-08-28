const { Product, User, Category, Auction} = require('../data/models')
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
    }
}

module.exports = { logic }