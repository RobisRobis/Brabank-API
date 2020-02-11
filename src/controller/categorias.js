const categoriaDAO = new (require('../models/Categoria'))()
const { validationResult } = require('express-validator')

module.exports = {
    async lista(req, res) {
        try {
            const categorias = await categoriaDAO.listar()
            if (categorias.length == 0)
                return res.status(404).send({ erro: 'Lista Vazia' })
            res.send(categorias)
        } catch(erro){ 
            console.log(erro)
            res.status(500).send(erro)
        }
    },
    async insere(req, res) {
        const erros = validationResult(req)

        if(erros)
            return res.status(400).send(erros)
        
        let categoria = req.body

        try{
            const resultado = await categoriaDAO.inserir(categoria)
            categoria = {id: resultado.insertId, ...categoria}
            res.status(201).send(categoria)
        }catch(erro) {
            console.log(erro)
            res.status(500).send(erro)
        }

    }
}
