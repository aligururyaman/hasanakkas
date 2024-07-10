import { default as Order } from "../models/order.model.mjs";

export async function createOrder(req, res) {
  try {
    const {
      userId,
      products,
      totalAmount,
      shippingAddress,
      shippingAddressGoogleMap,
      contactNumber,
    } = req.body;

    const order = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      shippingAddressGoogleMap,
      contactNumber,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOrdersByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId })
      .populate("products.productId")
      .populate("userId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("products.productId")
      .populate("userId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updates,
      options
    );
    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
