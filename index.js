

//import env file
require('dotenv').config()
//import express
const express=require ('express')
//import cors
const cors=require('cors')


//import db
require("./db/connection")


//create app
const server=express()
//import router
const router = require('./routes/router')




//connect with frontend
server.use(cors())

server.use(express.json())

server.use(router)



const port=4000 || process.env.port

// export uploads folder to client
            // folder name         this is path to be on frontend
server.use('/uploads',express.static('./uploads'))

server.listen(port,()=>{
    console.log(`Ems server runnning ${port}`);
})


