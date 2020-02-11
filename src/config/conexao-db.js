const mysql = require('mysql')

const conexao = mysql.createConnection({
    host:'54.81.215.218',
    port:3306,
    user:'robis',
    password:'bcd127',
    database:'brabank'
})

module.exports = conexao