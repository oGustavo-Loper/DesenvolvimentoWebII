import express from 'express'
import login from './RouteLogin.js'
import user from './RouteUser.js'
import company from './RouteCompany.js'
import sector from '../models/Sector.js'

const routes = (app) => {
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