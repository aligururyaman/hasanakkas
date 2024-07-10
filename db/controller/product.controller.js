import Product from "../models/product.model.js";
import { uploadImageToCloudinary } from "../utils/fileUpload.js";

export const createProduct = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity } = req.body;
    const file = req.file;

    const imageUrl = file ? await uploadImageToCloudinary(file) : null;

    const product = new Product({
      name,
      slug,
      price,
      description,
      category,
      quantity,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, price, description, category, quantity } = req.body;
    const file = req.file;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imageUrl = file
      ? await uploadImageToCloudinary(file)
      : product.imageUrl;

    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.imageUrl = imageUrl;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
