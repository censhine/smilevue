module.exports = {
    Succ:(msg,data = null)=>{
       return {code:200,msg:msg,data:data}
    },
    Fail:(msg)=>{
        return {code:500,msg:msg}
    }
}