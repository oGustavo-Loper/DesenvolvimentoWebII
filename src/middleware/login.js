const jwt = require('jsonwebtoken')

module.exports = (request, response, next) =>{
    try{
        const token = request.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        console.log(decode)
        request.user_id = decode.user_id
        next()
    }catch(error){
        return response.status(401).send({ erro: `Authentication failure` })
    }
}