const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

const checkout = async (req, res) => {
  const { cart_id } = req.params;
  const { user_id, paymentDetails } = req.body;
  
  try {
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const items = await Cart.getItems(cart_id);
    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const paymentSuccess = processPayment(paymentDetails);
    if (!paymentSuccess) {
      return res.status(500).json({ message: 'Payment processing failed' });
    }

    let total_price = 0;
    for (let item of items) {
      const price = await Cart.getProductPrice(item.product_id);
      total_price += price * item.quantity;
    }

    const order = await Order.createOrder(cart_id, user_id, total_price);

    res.status(201).json({
      message: 'Checkout successful',
      order,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
};


const processPayment = (paymentDetails) => {
    return true;
};

module.exports = {
  checkout,
};