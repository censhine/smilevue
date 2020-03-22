const Koa  = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js')
const cors = require('koa2-cors')

let _user = require('./appApi/User.js')
let _stock = require('./appApi/Stock.js')
let _goods = require('./appApi/Goods.js')

;(async ()=>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    // let oneUser = new User({userName:'koa2',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('insert row successed!')
    // })

    let users = await User.findOne({}).exec()
    console.log(users)
})()



let router = new Router()
router.use('/user', _user.routes())
router.use('/stock', _stock.routes())
router.use('/goods', _goods.routes())

app.use(bodyParser())
.use(cors())
.use(router.routes())
.use(router.allowedMethods())

app.listen({port:3000,hostname:'192.168.0.108'},()=>{
    console.log('[server] starging at port 3000')
})