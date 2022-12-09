import mongoose from 'mongoose'

const SectorSchema = new mongoose.Schema(
    {
        id: { type: String },
        nameSector: { type: String, required: true },
        tableQuantity: { type: String, required: true },
        companyId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'company',
            required: true,
        }
    }
)

const sector = mongoose.model('sector', SectorSchema)
export default sector