const { Order, cartItem } = require('../models/OrderSchema');
const expressAsyncHandler = require('express-async-handler');


const orderById = expressAsyncHandler(async(req, res, next)=>{
    const order = await Order.findById(req.params.orderId)
    .populate('products.product', 'name price')
    .exec((err, order)=>{
        if(err || !order){
            return res.status(400).json({
                error: "Order not found"
            })
        }
        req.order = order;
        next();
    });
});


const makeOrder = expressAsyncHandler(async(req, res)=>{
    
    
});