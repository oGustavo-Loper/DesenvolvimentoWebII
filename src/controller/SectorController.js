import sector from "../models/Sector.js";

class SectorController {
    static listSector = (request, response) => {
        sector.find()
            .populate('companyId', 'name')
            .exec((err, sector) => {
                response.status(200).json(sector)
            })
    }
    static listSectorId = (request, response) => {
        const id = request.params.id
        sector.findById(id)
            .populate('companyId', 'name')
            .exec((err, sector) => {
                if(err) {
                    response.status(400).send({ msg: err})
                }
                else {
                    response.status(200).send(sector)
                }
            })
    }
    static registerSector = (request, response) => {
        const SectorReq = request.body
        if(SectorReq && SectorReq.nameSector && SectorReq.tableQuantity && SectorReq.companyId){
            const NewSector = new sector(SectorReq)
            NewSector.save((err, saveSector) => {
                if(err){
                    response.status(500).json({ Erro: err })
                } else {
                    return response.status(201).json(saveSector)
                }
            })
        } else {
            return response.status(400).json({
                Erro: 'Name Sector, Table Quantity and/or company invalid'
            })
        }
    }
    static updateSector = (request, response) => {
        const id = request.params.id
        sector.findByIdAndUpdate(id, { $set: request.body }, (err) => {
            if(!err) {
                response.status(200).send({ msg: 'Update Sector'})
            }
            else {
                response.status(500).send({ msg: err})
            }
        })
    }
    static deleteSector = (request, response) => {
        const id = request.params.id
        sector.findByIdAndDelete(id, (err) => {
            if(!err) {
                response.status(200).send({ msg: 'Deleted Sector'})
            }
            else {
                response.status(500).send({ msg: err})
            }
        })
    }
}

export default SectorController