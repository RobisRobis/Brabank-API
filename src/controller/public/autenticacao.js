const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const { validationResult } = require('express-validator')
const usuarioDAO = new (require('../../models/Usuarios'))()

gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 1200 })

module.exports = {
    async registrar(req, res) {


        console.log('passou')

        const erros = validationResult(req)

        if (!erros.isEmpty())
            return res.status(400).send(erros)

        let usuario = req.body

        try {

            const hash = await bcrypt.hash(usuario.senha, 10)
            usuario.senha = hash

            const resultado = await usuarioDAO.inserir(usuario)
            usuario = { id: resultado.insertId, ...usuario }

            res.status(201).send({
                usuario,
                token: gerarToken({ id: usuario.id })
            })

        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
        }

    },

    async autenticar(req, res) {

        console.log('passou')
        const { email, senha } = req.body

        try {
            let usuario = await usuarioDAO.buscarPorEmail(email)

            usuario = usuario[0]

            if (!usuario) {
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos' })
            }

            if (! await bcrypt.compare(senha, usuario.senha)) {
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos 2' })
            }

            delete usuario.senha;
            res.send({ usuario, token: gerarToken({ id: usuario.id }) })
        } catch (erro) { 
            console.log(erro)
            res.status(500).send(erro)
        }

    }
}




// const autenticacao = (app) => {

//     app.post('/autenticar', (req, resp) => {
//         const { email, senha } = req.body;

//         dao = app.models.Usuarios;

//         dao.buscarPorEmail(email).then(usuario => {
//             if (!usuario) {
//                 return resp.status(401)
//                     .send({ erro: 'Usuário e/ou senha inválidos' })
//             }

//             bcrypt.compare(senha, usuario.senha, (erro, resultado) => {
//                 if (!resultado) {
//                     return resp.status(401)
//                         .send({ erro: 'Usuário e/ou senha inválidos' })
//                 }

//                 delete usuario.senha;
//                 resp.send({ usuario, token: gerarToken({ id: usuario.id }) })
//             })
//         })
//     })

    // app.post('/registrar',
    //     usuariosValid.validacoes()
    //     ,
    //     (req, res) => {
    //         let usuario = req.body

    //         const erros = validationResult(req)


    //         if (!erros.isEmpty()) {
    //             res.status(400).send(erros);
    //             return;
    //         }

    //         bcrypt.hash(usuario.senha, 10, (erro, hash) => {
    //             usuario.senha = hash;

    //             const dao = app.models.Usuarios;

    //             dao.inserir(usuario)
    //                 .then(retorno => {
    //                     delete retorno.senha
    //                     res.status(201).send({ retorno, token: gerarToken({ id: retorno.id }) })
    //                 })
    //                 .catch(erro => {
    //                     console.log(erro)
    //                     res.status(500).send(erro)
    //                 })
    //         })
    //     })

    //Auth await
    // app.post('/autenticar/await', async (req, resp) => {
    //     const { email, senha } = req.body;

    //     dao = app.models.Usuarios;

    //     const usuario = await dao.buscarPorEmail(email)

    //     if(!usuario){
    //         return resp.status(401)
    //         .send({erro: 'Usuário e/ou senha inválidos'})
    //     }

    //     if(! await bcrypt.compare(senha, usuario.senha)){
    //         return resp.status(401)
    //         .send({erro: 'Usuário e/ou senha inválidos'})
    //     }

    //     delete usuario.senha;

    // }


