
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let objId = Schema.Types.ObjectId

const CategorySubSchema = new Schema({
    ID: {unique:true,type:Number},
    MALL_CATEGORY_ID:{type:String},
    MALL_SUB_NAME:{type:String},
    IMAGE: String,
    SORT: Number,
    COMMENTS: String
})

mongoose.model('CategorySub',CategorySubSchema,'categorySub')