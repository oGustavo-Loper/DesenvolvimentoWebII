// import express from 'express'
// import CompanyController from '../controller/CompanyController.js'
// import UserController from '../controller/UserController.js'
// import SectorController from '../controller/SectorController.js'

// const routes = express('routes')

// routes
//     .get('/user', UserController.listUser)
//     .get('/user/:id', UserController.listUserId)
//     .post('/user', UserController.registerUser)
//     .put('/user/:id', UserController.updateUser)
//     .delete('/user/:id', UserController.deleteUser)

// routes
//     .get('/company', CompanyController.listCompany)
//     .get('/company/:id', CompanyController.listCompanyId)
//     .post('/company', CompanyController.registerCompany)
//     .put('/company/:id', CompanyController.updateCompany)
//     .delete('/company/:id', CompanyController.deleteCompany)

// routes.post('/login', UserController.validateUser)

// routes
//     .get('/sector', SectorController.listSector)
//     .get('/sector/:id', SectorController.listSectorId)
//     .post('/sector', SectorController.RegisterSector)
//     .put('/sector/:id', SectorController.updateSector)
//     .delete('/sector/:id', SectorController.deleteSector)

// export default routes

import express from 'express'
import cors from 'cors'
import login from './RouteLogin.js'
import user from './RouteUser.js'
import company from './RouteCompany.js'
import sector from './RouteSector.js'

const routes = (app) => {
    app.use(cors())
    app.route('/').get((request, response) => {
        response.status(200).send({ msg: 'Run Project'})
    })
    app.use(
        express.json(),
        express.urlencoded({ extended: true }),
        login,
        user,
        company,
        sector,
    )
}

export default routes