import jwt from 'jsonwebtoken'

class validateToken {
    static valid = (request, response, next) => {
        const token = request.get('Token')
        if(!token) {
            response.status(401).json({ Erro: 'Token Invalid' })
        }
        else {
            jwt.verify(token, 'P455W0RD', (err, payload) => {
                if(err) {
                    response.status(401).json({ Erro: 'Token Invalid' })
                }
                else {
                    console.log(JSON.stringify(payload))
                    next()
                }
            })
        }
    }
}

export default validateToken