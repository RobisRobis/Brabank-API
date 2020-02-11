const router = require('express').Router()
const authController = require('../controller/public/autenticacao')
const usuarioValidator = require('../validators/UsuariosValidator')

// IMPORTANTE, EFETUAR VALIDAÇÕES PARA TODAS AS ROTAS 

router.post('/registrar', usuarioValidator.validacoes(), authController.registrar)
router.post('/autenticar', authController.autenticar)

module.exports = router

