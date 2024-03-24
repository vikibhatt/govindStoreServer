import express from 'express'
import { addItemsOnWebsite, confirmPayment, deleteItemsFromWebsite, getItems } from '../controller/payment.controller.js'
import {upload} from '../middleware/multer.middleware.js'

const router = express.Router()

router.post('/order',confirmPayment)
router.post('/addItems', 
upload.fields([
    {
        name: 'itemsImage',
        maxCount: 1
    }
]),
addItemsOnWebsite)
router.get('/getItems', getItems)
router.post('/deleteItems', deleteItemsFromWebsite)

export default router