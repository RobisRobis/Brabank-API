const conexao = require('../config/conexao-db')

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params || '', (erro, retorno) => {
            if(erro){ 
                return reject(erro)
            }else{
                resolve(retorno)
            }
        })
    })
}