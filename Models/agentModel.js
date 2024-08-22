import mongoose from 'mongoose'


const agentSchema = new mongoose.Schema({
    agent:{type: String, }
})
const agentModel = mongoose.model('Agent',agentSchema)

export default agentModel;