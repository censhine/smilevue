
const Router = require('koa-router') 
const router = new Router()
const mongoose = require('mongoose')
const util = require('../lib/util.js')
const sub = [5,2,3,6,7,3,5,2,8,5]
const mockGoods = [
    {cates:5,img:'https://img30.360buyimg.com/mobilecms/s280x280_jfs/t1/107172/39/9042/67774/5e6f119bEcaf3dbcd/cdea54d9b811db4a.jpg.webp'},
    {cates:2,img:'https://img14.360buyimg.com/mobilecms/s280x280_jfs/t1/108258/13/9285/169850/5e7101b6E1b736f4f/ea8d258a4d8f0051.jpg.webp'},
    {cates:3,img:'https://img13.360buyimg.com/mobilecms/s280x280_jfs/t1/97574/23/15776/36748/5e743528Ea3c35f26/0c6707d3a2b9de98.jpg.webp'},
    {cates:6,img:'https://img13.360buyimg.com/jdcms/s300x300_jfs/t1/88702/6/14511/171018/5e661fc1E4ad18e4f/075ea2288449e60f.jpg.webp'},
    {cates:7,img:'https://img14.360buyimg.com/jdcms/s300x300_jfs/t1/67306/11/2994/230989/5d132d78E2e0b2722/8fe11fedab470fe4.jpg.webp'},
    {cates:3,img:'https://img11.360buyimg.com/jdcms/s300x300_jfs/t1/103698/37/6828/167682/5df6d8b4Ece6f88f4/ee4341b1c72a8bc7.jpg.webp'},
    {cates:5,img:'https://img11.360buyimg.com/jdcms/s300x300_jfs/t1/55925/33/17125/165453/5ddf663cE3b404c2b/01995144738279d5.jpg.webp'},
    {cates:2,img:'https://img20.360buyimg.com/img/s300x300_jfs/t1/62469/5/508/53331/5ceb8281E826765d5/4b60125ae48ed09b.jpg!cc_150x150.webp'},
    {cates:8,img:'https://img10.360buyimg.com/jdcms/s300x300_jfs/t1/25098/14/13900/129124/5ca3073cE9169a531/0035e9f22d9d0a53.jpg.webp'},
    {cates:5,img:'https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/69679/28/584/117384/5cecb730E5cfd9705/37c4dcd5bb5ea2a2.jpg.webp'},
]

router.get('/getDetail',async(ctx)=>{
    let id = ctx.request.query.id
    console.log(id,isNaN(id))
    if(isNaN(id)) {
        return ctx.body = util.Fail('参数非法')
    }
    try{
        let _goods = mongoose.model('Goods')
        let result = await _goods.findOne({GOODS_ID:id}).exec()
            ctx.body = util.Succ('获取数据成功',result)
    }catch(err){
        ctx.body = util.Fail(err)
    }
})

router.get('/getCategoryGoodsList',async(ctx)=>{
    try{
        let _num = 10
        let _page = ctx.request.query.page || 1
        let _categoryId = ctx.request.query.cid
        let _goods = mongoose.model('Goods')
        let _start = (parseInt(_page)-1)*_num
        console.log(_categoryId,_start,_num)
        let result = await _goods.find({SUB_CATEGORY_ID:_categoryId}).skip(_start).limit(_num).exec()
        console.log(result)
            ctx.body = util.Succ('获取数据成功',result)
    }catch(err){
        ctx.body = util.Fail(err)
    }
})

router.get('/getCategoryList',async(ctx)=>{
    try{
        let _category = mongoose.model('Category')
        let result = await _category.find().exec()
            ctx.body = util.Succ('获取数据成功',result)
    }catch(err){
        ctx.body = util.Fail(err)
    }
})

router.get('/getCategorySubList',async(ctx)=>{
    try{
        let _categoryId = ctx.request.query.cid
        let _categorysub = mongoose.model('CategorySub')
        let result = await _categorysub.find({MALL_CATEGORY_ID:_categoryId}).exec()
            ctx.body = util.Succ('获取数据成功',result)
    }catch(err){
        ctx.body = util.Fail(err)
    }
})

router.post('/insertGoods', async(ctx)=>{
    let saveData = {
        GOODS_ID: null,
        GOODS_NAME: String,
        GOODS_IMAGE: String,
        GOODS_NUMBER: Number,
        GOODS_PRICE: String,
        SPECIAL_PRICE: String,
        GOODS_DESCRIPTION: String,
        SUB_CATEGORY_ID: Number
    }
    let num = 0
    let insertResult = []
    for(let z in mockGoods){
        console.log(mockGoods[z].cates)
        for(let j=0;j<mockGoods[z].cates;j++){
            num++
            for(let i=0;i<100+j;i++){
                num++
                saveData.GOODS_ID = num
                saveData.GOODS_NAME = '产品名称'+num
                saveData.GOODS_IMAGE = mockGoods[z].img
                saveData.GOODS_NUMBER = i;
                saveData.GOODS_PRICE = 100+i
                saveData.SPECIAL_PRICE = (100 + i - i*0.5).toFixed(2)
                saveData.GOODS_DESCRIPTION = '产品描述'+num
                saveData.SUB_CATEGORY_ID = z+1
                let GoodsModel = mongoose.model('Goods')
                let Goods = new GoodsModel(saveData)
                await Goods.save().then(()=>{
                    console.log(num,'inserted')
                    insertResult.push(1)
                })
            }
        }
    }
    
    if(insertResult.length){
        ctx.body = {
            code: 200,
            msg: '插入成功'
        }
    }else{
        ctx.body = {
            code: 500,
            msg: '插入失败'
        }
    }
    
})

router.post('/insertCategory',async(ctx)=>{
    let saveData = {
        ID: null,
        MALL_CATEGORY_NAME: String,
        IMAGE: String,
        TYPE: Number,
        SORT: Number,
        COMMENTS: String
    }

    for(let i=0;i<10;i++){
        saveData.ID = i
        saveData.MALL_CATEGORY_NAME = '分类'+i
        saveData.IMAGE = 'https://img13.360buyimg.com/mobilecms/s300x300_jfs/t23659/343/2266022897/27837/c174d7b9/5b7984f5N982f1cd6.jpg!q70.jpg.webp'
        saveData.TYPE = 0;
        saveData.SORT = 100+i
        saveData.COMMENTS = '产品描述'+i
        let cModel = mongoose.model('Category')
        let obj = new cModel(saveData)
        let insertResult = []
        await obj.save().then(()=>{
            console.log(i,'inserted')
            insertResult.push(1)
        })

        if(insertResult.length){
            ctx.body = {
                code: 200,
                msg: '插入成功'
            }
        }else{
            ctx.body = {
                code: 500,
                msg: '插入失败'
            }
        }
    }
})

router.post('/insertCategorySub',async(ctx)=>{
    let saveData = {
        ID: null,
        MALL_CATEGORY_ID:String,
        MALL_SUB_NAME:String,
        IMAGE: String,
        SORT: Number,
        COMMENTS: String
    }

    let insertResult = []
    let id = 0
    for(let i=1;i<10;i++){
        id++
        for(j=1;j<sub.length;j++){
            id++
                saveData.ID = id
                saveData.MALL_CATEGORY_ID = i
                saveData.MALL_SUB_NAME = '子分类'+id
                saveData.IMAGE = 'https://img10.360buyimg.com/mobilecms/s300x300_jfs/t18208/289/2380620210/612160/d7503432/5af18259N86c77171.jpg!q70.jpg.webp'
                saveData.SORT = 100+id
                saveData.COMMENTS = '子分类描述'+id
                let cModel = mongoose.model('CategorySub')
                let obj = new cModel(saveData)
                
                await obj.save().then(()=>{
                    console.log(i,id,'inserted')
                    insertResult.push(1)
                })
            }
        }
        
        if(insertResult.length){
            ctx.body = {
                code: 200,
                msg: '插入成功'
            }
        }else{
            ctx.body = {
                code: 500,
                msg: '插入失败'
            }
        }
})

module.exports = router