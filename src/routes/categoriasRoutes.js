const router = require('express').Router()
const categoriasController = require('../controller/categorias')

router.get('/', categoriasController.lista)
router.post('/', categoriasController.insere)

module.exports = router