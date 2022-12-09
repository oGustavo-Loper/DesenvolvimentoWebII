import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    cnpj: { type: String },
    email: { type: String },
    },
    {
        versionKey: false
    }
)

const company = mongoose.model('company', CompanySchema)

export default company