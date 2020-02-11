//IMPORTAMOS A CONSTANTE EXPRESS
const express = require('express')
const app = express()
const consign = require('consign')

customExpress = () => {

    app.use(express.json())

    consign()
        .include('controller/public')
        .then('middleware')
        .then('controller')
        .then('models')
        .into(app)

    return app
}

// module.exports = customExpress()
