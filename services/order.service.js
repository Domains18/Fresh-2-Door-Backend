const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/OrderSchema');
const User = require('../models/userschema');

const makeOrder = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, qty, image, price, address, city, country, postalCode, mobile } = req.body;
        const order = new Order({
            user: user._id,
            products: {
                name,
                qty,
                image,
                price,
                mobile,
            },
            shippingInfo: {
                address,
                city,
                country,
                postalCode,
                country,
            }
        });
        const createdOrder = await order.save();
        if(createdOrder) {
            res.status(201).json({ message: 'Order created successfully', order: createdOrder });
        } else{
            res.status(400).json({ message: 'Order not created' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});


const getOrders = expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        if(orders) {
            res.status(200).json({ message: 'Orders fetched successfully', orders });
        } else {
            res.status(400).json({ message: 'Orders not fetched' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});

const getOrderById = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order) {
            res.status(200).json({ message: 'Order fetched successfully', order });
        } else {
            res.status(400).json({ message: 'Order not fetched' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});

const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save();
            res.status(200).json({ message: 'Order paid successfully', order: updatedOrder });
        } else {
            res.status(400).json({ message: 'Order not paid' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});


const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.status(200).json({ message: 'Order delivered successfully', order: updatedOrder });
        } else {
            res.status(400).json({ message: 'Order not delivered' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});

const getOrdersAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name');
        if(orders) {
            res.status(200).json({ message: 'Orders fetched successfully', orders });
        } else {
            res.status(400).json({ message: 'Orders not fetched' });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
});

module.exports = {
    makeOrder,
    getOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrdersAdmin,
}