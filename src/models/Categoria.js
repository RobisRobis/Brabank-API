const baseQuery = require('./baseQuery')

class Categoria {

    listar() {
        return baseQuery('SELECT * FROM categoria')
    }

    inserir(categoria) {
        return baseQuery(' INSERT INTO categoria SET ? ', categoria)
    }

    buscarPorId(id) {
        return new baseQuery('SELECT * FROM categoria WHERE id = ?', id)
    }

    atualizar(categoria) {
        return new baseQuery('UPDATE categoria SET ? WHERE id = ?', [categoria, categoria.id])
    }

    deletar(id) {
        return new baseQuery('DELETE FROM categoria WHERE id = ?', id)
    }

}

module.exports = Categoria