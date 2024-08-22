import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    firstname:{type: String},
    dob:{type: Date },
    address:{type: String },
    phone:{type: String},
    state:{type: String},
    zip:{type: String},
    email:{type: String },
    gender:{type: String },
    userType:{type: String },
})

const userModel = mongoose.model('User',userSchema)

export default userModel;