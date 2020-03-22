
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let objId = Schema.Types.ObjectId

const CategorySchema = new Schema({
    ID: {unique:true,type:Number},
    MALL_CATEGORY_NAME: String,
    IMAGE: String,
    TYPE: Number,
    SORT: Number,
    COMMENTS: String
})

mongoose.model('Category',CategorySchema,'category')