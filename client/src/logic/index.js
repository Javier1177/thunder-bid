const { validate } = require('../utils/validate')

const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    register(email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)
                validate._validateStringField('name', name)
                validate._validateStringField('surname', surname)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password, name, surname }), 201)
                    .then(() => true)
                    .catch(err => err)
            })
    },

    login(email, password){
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)

                return this._call('login', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .catch(err => err)
            })
    },


}

module.exports = logic