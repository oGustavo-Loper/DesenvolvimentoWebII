const Product = require('../models/Product')

module.exports = {
    async index(request, response){
        try{
            const products = await Product.find({})
            return response.status(200).json(products)
        }catch(error){
            return response.status(400).json({ msg: error.message })
        }
    },
    searchById(request, response){
        const id = request.params.id;
        Product.findById(id, (err, productNotFound) =>{
            if(err){
                response.status(500).send(err)
            }
            else if (productNotFound){
                return response.json(productNotFound)
            }else{
                return response.status(404).json({ Erro: `Product not found` })
            }
        })
    },
    delete(request, response){
        const id = request.params.id
        Product.findByIdAndDelete(id, (err, ProductDeleted) =>{
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
        const id = req.params.id
        const _name = request.body
        Product.findByIdAndUpdate(id, _name, (err, UpdateProduct) =>{
            if(err){
                response.status(500).send(err)
            }else if(UpdateProduct){
                return response.json(UpdateProduct)
            }else{
                return response.status(404).json({ Erro: `Product not found` })
            }
        })
    },
    async create(request, response){
        const { name } = request.body
        try{
            const newProduct = Product.create({ name })
            return response.status(200).json(newProduct)
        }catch(error){
            return response.status(400).json({ msg: error.message})
        }
    }
}