import mongoose from 'mongoose'


const userAccountSchema = new mongoose.Schema({
    account_name:{type: String, }
})

const userAccountModel = mongoose.model('AgentName',userAccountSchema)

export default userAccountModel;