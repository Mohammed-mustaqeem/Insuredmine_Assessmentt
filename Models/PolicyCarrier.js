
import mongoose from 'mongoose'


const policyCarrierSchema = new mongoose.Schema({
    company_name:{type: String, }
})
const policyCarrierModel = mongoose.model('policyCarrier',policyCarrierSchema)

export default policyCarrierModel;