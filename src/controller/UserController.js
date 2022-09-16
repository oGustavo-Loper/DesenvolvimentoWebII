const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async index(request, response){
        try{
            const users = await User.find({})
            return response.status(200).json(users)
        }catch(error){
            return response.status(400).json({ msg: error.message})
        }
    },
    delete(request, response){
        const id = request.paraments.id;
        User.findByIdAndDelete(id, (err, ProductDeleted) => {
            if(err){
                response.status(500).send(err)
            }else if(ProductDeleted){
                return response.json(ProductDeleted)
            }else{
                return response.status(404).json({ Erro: `Product not found` })
            }
        })
    },
    Update(request, response){
        const id = request.paraments.id
        const _name = request.body
        User.findByIdAndUpdate(id, _name, (err, UpdateProduct) =>{
            if(err){
                response.status(500).send(err);
            }else if(UpdateProduct){
                return response.json(UpdateProduct)
            }else{
                return response.status(404).json({ Erro: `Product not found` })
            }
        })
    },
    async Create(request, response){
        const { name, password } = request.body
        try{
            const hash = bcrypt.hashSync(password, 10);
            const newProduct = User.Create({ name, password: hash })
            return response.status(200).json(newProduct);
        }catch(error){
            return response.status(400).json({ msg: error.message })
        }
    },
    async Login(request, response){
        const { name, password } = request.body
        if( !name || !password ){
            response.status(400).json({ erro: `Incorrect login or password`})
            return
        }
        try{
            const dados = await User.findOne({ name });
            if(!dados){
                response.status(400).json({ erro: `Incorrect login or password`});
                return;
            }
            if(bcrypt.compareSync(password, dados.password)){
                const token = jwt.sign({
                    user_id: dados.id,
                    user_name: dados.name
                }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                response.status(200).json({ name: dados.name, token });
            }else{
                response.status(400).json({ erro: `Incorrect login or password` })
            }
        }catch(error){
            response.status(400).json({ erro: error.message })
        }
    }
}