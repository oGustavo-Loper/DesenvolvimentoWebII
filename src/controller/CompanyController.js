import company from "../models/Company.js";
import sector from "../models/Sector.js";

class CompanyController {
    static listCompany = (request, response) => {
        company.find((err, company) => {
            response.status(200).json(company)
        })
    }
    static listCompanyId = (request, response) => {
        const id = request.params.id
        company.findById(id).exec((err, company) => {
            if(err) {
                response.status(400).send({ Erro: err})
            }
            else {
                response.status(200).send(company)
            }
        })
    }
    static registerCompany = (request, response) => {
        const CompanyReq = request.body
        if(CompanyReq && CompanyReq.name && CompanyReq.email && CompanyReq.cnpj) {
            const NewCompany = new company(CompanyReq)
            // console.log('Password 1', NewCompany.password)
            // NewCompany.password = bcrypt.hashSync(CompanyReq.password, 10)
            // console.log('Password 2', NewCompany.password)
            NewCompany.save((err, saveUser) => {
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
    static updateCompany = (request, response) => {
        const id = request.params.id
        company.findByIdAndUpdate(id, { $set: request.body }, (err) => {
            if(!err) {
                response.status(200).send({ Msg: 'Company update sucess'})
            }
            else {
                response.status(500).send({ Msg: err})
            }
        })
    }
    static deleteCompany = (request, response) => {
        const id = request.params.id
        company.findByIdAndDelete(id, (err) => {
            if(!err) {
                response.status(200).send({ msg: 'Remove company sucess'})
            }
            else {
                response.status(500).send({ msg: err })
            }
        })
    }
    static listSectorsAndCompany = (request, response) => {
        const id = request.query.id
        sector.find({'sector': id}, {}, (err, sector) => {
            response.status(200).send(sector)
        })
    }
}

export default CompanyController