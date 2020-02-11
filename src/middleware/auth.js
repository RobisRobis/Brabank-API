const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

// module.exports = (app) => {
//     app.use(mid)
// }

module.exports = async (req, res, next) => {

    console.log('PASSOU')

    const authHeader = req.headers.authorization
    
    if(!authHeader){
        return res.status(401).send({erro: 'Token não informado'})
    }

    const parts = authHeader.split(' ');

    console.log(parts);

    if(parts.length !== 2)
        return res.status(401).send({erro: "Erro no Token"})

    const [bearer, token] = parts

    if(!/^Bearer$/i.test(bearer))
        return res.status(401).send({erro: "Token mal formado"})

        try{
            const decoded = await jwt.verify(token, auth.secret)
            req.userId = decoded.id
            return next()
        }catch(err){
            res.status(401).send({erro: "Token inválido"})
        }
}