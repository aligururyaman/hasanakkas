import Other from "../models/other.models";

export const createOther = async (req, res) => {
  try {
    const { name } = req.body;

    const other = new Other({ name });
    await other.save();
    res.status(200).json(other);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllOther = async (req, res) => {
  try {
    const other = await Other.find();
    res.json(other);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOtherById = async (req, res) => {
  try {
    const { name } = req.body;
    const other = await Other.findById(req.params.id);

    if (!other) {
      res.status(404).json({ message: "Other not found" });
    }
    other.name = name;
    await other.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOtherById = async (req, res) => {
  try {
    const other = await Other.findById(req.params.id);

    if (!other) {
      res.status(404).json({ message: "Other not found" });
    }
    await other.deleteOne();
    res.status(500).json({ message: "Deleted saccesfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
