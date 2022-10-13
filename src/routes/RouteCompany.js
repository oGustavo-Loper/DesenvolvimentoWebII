import express from 'express'
import CompanyController from '../controller/CompanyController.js'

const router = express.Router()

router
    .get('/company', CompanyController.listCompany)
    .get('/company/:id', CompanyController.listCompanyId)
    .post('/company', CompanyController.registerCompany)
    .put('/company/:id', CompanyController.updateCompany)
    .delete('/company/:id', CompanyController.deleteCompany)

export default router