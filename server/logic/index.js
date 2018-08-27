const { Product, User, Category, Auction} = require('../data/models')
const validateEmail = require('../utils/validate-email')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length || value.indexOf(' ') >= 0) throw new Error(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    register(email, password, name, surname){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)

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