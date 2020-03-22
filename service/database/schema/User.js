const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let objId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    UserId:objId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

userSchema.pre('save', function(next){
    console.log(this)
    var user = this
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err)
            user.password = hash
            next()
        })
    })

})
userSchema.methods = {
    comparePassword: (_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMath)=>{
                if(!err) resolve(isMath)
                else reject(err)
            })
        })
    }
}

mongoose.model('User',userSchema,'user')