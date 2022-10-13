import mongoose from 'mongoose'

const SectorSchema = new mongoose.Schema(
    {
        id: { type: String },
        nameSector: { type: String },
        tableQuantity: { type: String },
        Company: { type: mongoose.Schema.Types.ObjectId, ref: 'company', required: true}
    }
)

const sector = mongoose.model('sector', SectorSchema)
export default sector