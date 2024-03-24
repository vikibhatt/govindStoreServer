import {asyncHandler} from '../utils/asyncHandler.utils.js'
import {Order} from '../models/payment.model.js'
import {Item} from '../models/Items.model.js'
import {ApiResponse} from '../utils/apiResponse.utils.js'
import {ApiError} from '../utils/apiError.utils.js'
import {addFilesToCloudnary, deleteFilesFromCloudnary} from '../utils/cloudinary.utils.js'

const confirmPayment = asyncHandler(async(req, res)=>{
    const customerId = req.body.customerId
    const items = req.body.items;
    const itemAmount = req.body.itemAmount
    const itemQuantity = req.body.itemQuantity
    const discountAmount = req.body.discountAmount
    const totalAmount = req.body.totalAmount

    const orderItems = items.map((item, index) => ({
        name: item,
        amount: itemAmount[index],
        quantity: itemQuantity[index]
    }));

    try {
        const order = await Order.create({ 
            customerId,
            discountAmount,
            orderItems,
            totalAmount
        })

        console.log("Order added successfully: ");

        return res 
        .status(200)
        .json(
            new ApiResponse(200,order, "Order added successfully")
        )
    } catch (error) {
        throw new ApiError(500,error?.message || "Error while adding the order")
    }
})


const addItemsOnWebsite = asyncHandler(async(req, res)=>{
    const {itemsName, itemsAmount, quantity} = req.body

    let itemImagePath = req.files?.itemsImage[0].path
    let imagePath 

    if(itemImagePath) {
        imagePath = await addFilesToCloudnary(itemImagePath)
    }

    const items = {
        name: itemsName,
        amount: parseInt(itemsAmount),
        image: imagePath?.url || "",
        quantity: parseInt(quantity),
    }

    try {
        const allItems = await Item.create({
            items
        })

        console.log("Items added successfully");

        return res 
        .status(200) 
        .json(
            new ApiResponse(200, allItems, "Items added successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while adding the items")
    }
})

const deleteItemsFromWebsite = asyncHandler(async(req, res)=>{
    const {itemId} = req.query

    const item = await Item.findById(itemId)

    const imageUrl = item.items.image 

    if(imageUrl){
        await deleteFilesFromCloudnary(imageUrl, 'image')
        console.log("image deleted successfully");
    }

    try {
        await item.deleteOne();

        console.log("Item deleted successfully");

        return res 
        .status(200)
        .json(
            new ApiResponse(200, {}, "Item deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting the item")
    }

})

const getItems = asyncHandler(async(req, res)=>{
    try {
        const allItems = await Item.find()

        console.log("Items added successfully");

        return res 
        .status(200) 
        .json(
            new ApiResponse(200, allItems, "Items added successfully")
        )
    }
    catch (error) {
        throw new ApiError(500, error?.message || "Error while adding the items")
    }
})


export {confirmPayment, addItemsOnWebsite, getItems, deleteItemsFromWebsite}