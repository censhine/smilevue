const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/',async(ctx)=>{
    ctx.body = "this is home page"
})

router.get('/user',async(ctx)=>{
    ctx.body = "this is user home page"
})

router.post('/register',async(ctx)=>{
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch((error)=>{
        ctx.body = {
            code: 500,
            msg: error
        }
    })
})

router.post('/login',async(ctx)=>{
    let post = ctx.request.body
    console.log("-----login post-----",post)
    const User = mongoose.model('User')
    console.log(post.userName,post.password)
    await User.findOne({userName:post.userName}).exec().then(async(result)=>{
        console.log("-----find result----",result)
        if(result){
            let newUser = new User()
            console.log('------compare password -----',post.password,result.password)
            await newUser.comparePassword(post.password,result.password).then(async(response)=>{
                console.log(response)    
                if(response){
                     ctx.body = {code:200,msg:'登录成功'}   
                }else{
                    ctx.body = {code:500,msg:'密码错误'}
                }
            }).catch((error)=>{
                console.log("-----compare password error:",error)
                ctx.body = {code:500,msg:error}
            })
       } else{
            ctx.body = {code: 500,msg: '用户名错误'}
       }
    }).catch((error)=>{
        console.log("------find login user error:",error)
        ctx.body = {
            code: 500,
            msg: error
        }
    })
})

module.exports = router