const Order = require("../models/order");

const orderController = {
  async createOrder(req, res, next) {
    const {
      productId,
      userId,
      email,
      cardName,
      cardDetails,
      billingAddress,
      shipping,
    } = req.body;

    let newOrder;
    try {
      new Order({
        productId,
        userId,
        email,
        cardName,
        cardDetails,
        billingAddress,
        shipping,
      });

      newOrder = await Order.save();
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({ message: "Order Successfully Placed" });
  },

  async getAllOrders(req, res, next) {
    let allOrders;
    try {
      const orders = await Order.find({});

      allOrders = [];

      for (let index = 0; index < orders.length; index++) {
        const all = orders[index];
        allOrders.push(all);
      }
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ orders: allOrders });
  },
  
  async updateOrderByAdmin (req, res, next) {
    const {
        productId,
        userId,
        orderId,
        email,
        cardName,
        cardDetails,
        billingAddress,
        shipping,
        status,
      } = req.body;
      
      
      try {
        await Order.findOne({_id: orderId}, {status: status});
      } catch (error) {
        return next(error)
      }

      return res.status(200).json({message: 'Status Changed'});
  }
};

module.exports = orderController;
