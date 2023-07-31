const Order = require('../models/OrderSchema');
const expressAsyncHandler = require('express-async-handler');



const addOrderItems = expressAsyncHandler(async (req, res) => {
    const { products, shippingInfo } = req.body;

    try {
        if (products && products.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                products,
                user: req.user._id,
                shippingInfo,
            });

            const createdOrder = await order.save();
            if (!createdOrder) {
                res.status(400);
                throw new Error('Invalid order data');
            }
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


const getOrderById = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );
        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }
        res.json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});

const getMyOrders = expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }

});

const removeOrder = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }
        await order.remove();
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    removeOrder,
}