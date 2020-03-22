const Router = require('koa-router')
const router = new Router()
const axios = require('axios')

router.get('/',async(ctx)=>{
    ctx.body = {code:200,"msg":"参数错误"}
})

router.get('/getInfo', (ctx)=>{
    let get = ctx.request.query
    console.log(get.code)
    return new Promise((resolve,reject)=>{
        if(get.code){
            axios({
                url: 'http://hq.sinajs.cn/list='+get.code,
                methods: 'get',
                params: {}
            }).then((response)=>{
               let r = response.data.split(',')
               console.log(r[3])
               ctx.body = {
                   code:200,
                   msg:'ok',
                   data:{'nowprice':r[3]}
               }
               resolve({
                code:200,
                msg:'ok',
                data:{'nowprice':r[3]}
                }) 
            }).catch(err=>{
                console.log(err)
                reject(err)
                ctx.body = {
                    code: 500,
                    msg: err
                }
            })
        }else{
            ctx.body = {
                code: 500,
                msg: '参数错误'
            }
        }
    })
    
})

module.exports = router