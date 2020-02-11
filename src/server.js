const express = require('express')
const app = express()
const auth = require('./routes/authRoutes')
const categoria = require('./routes/categoriasRoutes')
const authMid = require('./middleware/auth')


app.use(express.json())
app.use('/', auth)

app.use(authMid)
app.use('/categorias', categoria)

module.exports = app
