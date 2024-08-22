import mongoose from 'mongoose'


const policyCategorySchema = new mongoose.Schema({
    category_name:{type: String, }
})

const policyCategoryModel = mongoose.model('LOB',policyCategorySchema)

export default policyCategoryModel;