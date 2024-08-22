import mongoose from 'mongoose'


const connectDB = async (DBSTRING,DBNAME)=>{
    try {
        await mongoose.connect(DBSTRING+DBNAME)
        console.log('database connected successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB