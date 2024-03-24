import express from "express"
import {limit} from './constants.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json({limit: limit}));
app.use(express.urlencoded({extended: true, limit: limit}))
app.use(express.static('public'))
app.use(cookieParser())


import router from './src/routes/payment.routes.js'

app.use('/api/v1/payments',router)

export {app}