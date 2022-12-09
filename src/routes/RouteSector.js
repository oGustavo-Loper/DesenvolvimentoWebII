import express from 'express'
import SectorController from '../controller/SectorController.js'

const router = express.Router()

router
    .get('/sector', SectorController.listSector)
    .get('/sector/:id', SectorController.listSectorId)
    .post('/sector', SectorController.registerSector)
    .put('/sector/:id', SectorController.updateSector)
    .delete('/sector/:id', SectorController.deleteSector)

export default router