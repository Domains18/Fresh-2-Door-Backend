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