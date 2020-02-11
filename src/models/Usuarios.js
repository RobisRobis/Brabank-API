const baseQuery = require('./baseQuery')

class Usuarios {

    lista() {
        return baseQuery('SELECT * FROM usuario')
    }

    inserir(usuario) {
        return baseQuery(' INSERT INTO usuario SET ? ', usuario)
    }

    buscarPorEmail(email) {
        return baseQuery('SELECT * FROM usuario WHERE email = ?', email)
    }

}

module.exports = Usuarios