const Basket = require("../models/basket.model");

const addBasketItem = async (req, res) => {
  try {
    const { userId, productId, totalAmount } = req.body;
    const newBasketItem = new Basket({
      userId,
      productId,
      totalAmount,
      createdAt: new Date(),
    });
    await newBasketItem.save();
    res.status(201).json(newBasketItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to basket", error });
  }
};

const getBasketItems = async (req, res) => {
  try {
    const basketItems = await Basket.find({ userId: req.params.userId });
    res.status(200).json(basketItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch basket items", error });
  }
};

const deleteBasketItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Basket.findByIdAndDelete(id);
    res.status(200).json({ message: "Basket item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete basket item", error });
  }
};

module.exports = {
  addBasketItem,
  getBasketItems,
  deleteBasketItem,
};
