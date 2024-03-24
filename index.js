import express from 'express'
import {connectDB} from './db.js'
import dotenv from 'dotenv'
import {app} from './app.js'

dotenv.config(
    { path: './.env' }
)

const port = process.env.PORT

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`);
    })
})
.catch((error)=>{
    console.log("Server connection error: ",error);
})

