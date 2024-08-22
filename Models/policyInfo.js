
import mongoose from 'mongoose'


const policyInfoSchema = new mongoose.Schema({
    
    policy_number:{type: String },
    policy_start_date:{type: Date},
    policy_end_date:{type: Date},
    policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const policyInfoModel = mongoose.model('policyInfo',policyInfoSchema)

export default policyInfoModel;