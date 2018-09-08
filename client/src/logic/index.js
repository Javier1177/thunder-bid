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
                    .catch(err => {throw new Error(err)})
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
                    .catch(({message}) => {throw new Error(message)})
            })
    },

    listUserBiddedProducts(userId, token){
        return Promise.resolve()
            .then(() => this._call(`user/bidded/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => res.json())
            .catch(err => err)
    },

    listUserWishes(userId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/wishes/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200)})
            .then(res => res.json())
            .catch(err => err)
    },

    retrieveProduct(productId){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}`, 'get', undefined, undefined, 200))
            .then(res => res.json())
            .catch(err => err)
    },

    retrieveUser(userId, token){
        return Promise.resolve()
            .then(() => this._call(`user/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => {
                return res.json()
            })
            .catch(err => err)
    },

    addBid(productId, userId, price, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/bid/${userId}`, 'post', 
                {authorization: `bearer ${token}`, 'content-type': 'application/json'},
                JSON.stringify({ price }), 201))
            .then(res => {
                return res.json()
            })
            .catch(err => {throw new Error(err)})
    },

    addWish(productId, userId, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/wish/${userId}`, 'post', {authorization: `bearer ${token}`}, undefined, 201))
            .then(res => res.json())
            .catch(({message}) => {throw new Error(message)})
    },

    deleteWish(productId, userId, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/wish/${userId}`, 'delete', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => res.json())
            .catch(err => {throw new Error(err)})
    },

    listProducts(query, category){
        return Promise.resolve()
            .then(() => {
                let _query = ''

                if (query || category) {
                    _query += '?'

                    if (query) _query += `q=${query}`
                    
                    if (category) _query += `${query? '&' :''}c=${category}`

                }
                
                return this._call(`/products${_query}`, 'get', { 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => {
                
                return res.json()})
            .catch(err => err)
    }

}

module.exports = logic