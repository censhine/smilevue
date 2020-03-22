const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db"
const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise = global.Promise

exports.connect = ()=>{
    let maxConnections = 0
    mongoose.connect(db)
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('*******database has disconnected*******')
            if(maxConnections < 3){
                maxConnections++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('database error occured,please fix asap')    
            }
        })
        
        mongoose.connection.on('error',err=>{
            console.log('*******database error*******')
            if(maxConnections < 3){
                maxConnections++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('database error occured,please fix asap')    
            }
        })
        
        mongoose.connection.on('open',()=>{
            console.log("MongoDB connected successed!")
            resolve()
        })
    })
    
}

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}