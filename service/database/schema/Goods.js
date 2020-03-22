const mongoose = require('mongoose')
const Schema = mongoose.Schema
let _objectId = Schema.Types.objectId

const GoodsSchema = new Schema({
    GOODS_ID: {unique:true,type:Number},
    GOODS_NAME: String,
    GOODS_IMAGE: String,
    GOODS_NUMBER: Number,
    GOODS_PRICE: String,
    SPECIAL_PRICE: String,
    GOODS_DESCRIPTION: String,
    SUB_CATEGORY_ID: Number
})

mongoose.model('Goods', GoodsSchema, 'goods')