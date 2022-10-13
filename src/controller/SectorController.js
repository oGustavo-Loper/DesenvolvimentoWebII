import sector from "../models/Sector.js";

class SectorController {
    static listSector = (request, response) => {
        sector.find()
            .populate('company', 'name')
            .exec((err, sector) => {
                response.status(200).json(sector)
            })
    }
    static listSectorId = (request, response) => {
        const id = request.params.id
        sector.findById(id)
            .populate('company', 'name')
            .exec((err, sector) => {
                if(err) {
                    response.status(400).send({ msg: err})
                }
                else {
                    response.status(200).send(sector)
                }
            })
    }
    static RegisterSector = (request, response) => {
        let sectors = new sector(request.body)
        sectors.save((err) => {
            if(err) {
                response.status(500).send({ Erro: err})
            }
            else {
                response.status(201).send(secotrs.toJSON())
            }
        })
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