const {check, body} = require('express-validator')
const usuarioDao = new (require('../models/Usuarios'))()


class Usuarios{

    static validacoes(){
        return [
            check('nome').isLength({min:5,max:100})
             .withMessage("Campo nome deve ter entre 5 e 100 caracteres"),
            check('email').isEmail()
             .withMessage("Deve ser um email válido !"),
            check('cpf').isNumeric()
             .withMessage("Deve conter apenas números"),
            check('sexo').isLength({min:1,max:1})
             .withMessage("Deve conter apenas 1 caracterer."),
            check('senha').isLength({min:6,max:15})
             .withMessage("Deve conter entre 6 à 15 caracteres"),
            body('email').custom(email => {
                return usuarioDao.buscarPorEmail(email).then(retorno => {
                    retorno = retorno[0]
                    if(retorno){
                        return Promise.reject("Email já cadastrado !")
                    }
                })
            })
        ]
    }

}

module.exports = Usuarios