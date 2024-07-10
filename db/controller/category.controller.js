import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({ name });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    await category.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    res.status(500).json({ message: "Deleted saccesfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
