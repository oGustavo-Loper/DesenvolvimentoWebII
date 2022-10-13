import user from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {
    static listUser = (request, response) => {
        user.find({}, (err, user) => {
            if(err) {
                response.status(500).json({ Erro: err })
            }
            else {
                response.status(200).json(user)
            }
        })
    }
    static listUserId = (request, response) => {
        const id = request.params.id

        user.findById(id, (err, userFound) => {
            if(err) {
                response.status(500).json({ Erro: err })
            }
            else if(userFound) {
                return response.json(userFound)
            }
            else {
                return response.status(404).json({ Erro: 'User not found'})
            }
        })
    }
    static registerUser = (request, response) => {
        const UserReq = request.body
        if(UserReq && UserReq.name && UserReq.email && UserReq.password) {
            const NewUser = new user(UserReq)
            console.log('Password 1', NewUser.password)
            NewUser.password = bcrypt.hashSync(UserReq.password, 10)
            console.log('Password 2', NewUser.password)
            NewUser.save((err, saveUser) => {
                if(err) {
                    response.status(500).json({ Erro: err })
                }
                else {
                    return response.status(201).json(saveUser)
                }
            })
        }
        else {
            return response.status(400).json({
                Erro: 'Name, email and/or password invalid'
            })
        }
    }
    static updateUser = (request, response) => {
        const id = request.params.id
        const userReq = request.body
        if(!userReq || !userReq.name || !userReq.email) {
            return response.status(400).json({
                Erro: 'Name and/or email are mandatory'
            });
        }
        if(userReq.password){
            userReq.password = bcrypt.hashSync(userReq.password, 10)
        }
        user.findByIdAndUpdate(id, userReq, { new: true },
            (err, updateUser) => {
                if(err) {
                    response.status(500).json({ Erro: err })
                }
                else if(updateUser) {
                    return response.json(updateUser)
                }
                else{
                    return response.status(404).json({ Erro: 'User not found' })
                }
            })
    }
    static deleteUser = (request, response) => {
        const id = request.params.id
        user.findByIdAndDelete(id, (err, userDeleted) => {
            if(err) {
                return response.status(500).json({ Erro: err })
            }
            else if(userDeleted) {
                return response.json(userDeleted)
            }
            else {
                return response.status(400).json({ Erro: 'User not found' })
            }
        })
    }
    static searchUser = (request,respose) => {
        if(request.query && request.query.email) {
            const paramsEmail = request.query.email
            user.findOne({ email: paramsEmail }, (err, userSearch) => {
                if(err){
                    return response.status(500).json({ Erro: err })
                }
                else if(userSearch) {
                    return response.json(userSearch);
                }
                else {
                    return response.status(404).json({ Erro: 'User Not Found'})
                }
            })
        }
        else {
            response.status(400).json({ Erro: 'Email not insert' })
        }
    }
    static validateUser = (request, response) => {
        if(request.body && request.body.email && request.body.password) {
            const emailUser = request.body.email
            const passwordUser = request.body.password
            user.findOne({ email: emailUser}, (err, userSearch) => {
                if(err) {
                    return response.status(500).json({ Erro: err })
                }
                else if(userSearch && bcrypt.compareSync(passwordUser, userSearch.password)) {
                    const token = jwt.sign({
                        id: userSearch.id
                    }, 'P455W0RD', { expiresIn: '1h'})
                    response.status(201).json({ token: token })
                }
                else {
                    response.status(401).json({ Erro: 'User or password invalid' })
                }
            })
        }
        else {
            response.status(400).json({ Erro: 'Params invalid' })
        }
    }
}

export default UserController