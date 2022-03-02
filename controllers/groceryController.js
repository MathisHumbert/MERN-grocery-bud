const Grocery = require('../models/groceryModel');
const User = require('../models/userModel');

const getAllGroceries = async (req, res) => {
  const { id } = req.user;

  // Check if the user exists
  const user = await User.findById(req.user);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Get all groceries from the actual user
  const groceries = await Grocery.find({ user: id });

  res.status(200).json(groceries);
};

const createGrocery = async (req, res) => {
  const { value } = req.body;

  // Check for value
  if (!value) {
    res.status(400);
    throw new Error('Please add a grocery value');
  }

  // Check if the user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Create grocery
  const grocery = await Grocery.create({
    value,
    user: req.user.id,
  });

  res.status(201).json(grocery);
};

const updateGrocery = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  // Check for value
  if (!value) {
    res.status(400);
    throw new Error('Please add a grocery value');
  }

  // Check if the user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const grocery = await Grocery.findById(id);

  // Check if the grocery exists
  if (!grocery) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Check if the user owns the grocery that he wants to update
  if (grocery.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Get grocery from the actual user and update it
  const updatedGrocery = await Grocery.findOneAndUpdate(
    { _id: id },
    { value },
    { new: true }
  );

  res.status(200).json(updatedGrocery);
};

const deleteGrocery = async (req, res) => {
  const { id } = req.params;

  // Check if the user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const grocery = await Grocery.findById(id);

  // Check if the grocery exists
  if (!grocery) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Check if the user owns the grocery that he wants to delete
  if (grocery.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Get grocery from the actual user and delete it
  await Grocery.findByIdAndDelete(id);

  res.status(200).json({ success: true });
};

const deleteAllGroceries = async (req, res) => {
  const { id } = req.user;

  // Check if user exists
  const user = await User.findById(req.user);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Delete all groceries from the actual user
  await Grocery.deleteMany({ user: id });

  res.status(200).json({ success: true });
};

module.exports = {
  getAllGroceries,
  createGrocery,
  updateGrocery,
  deleteGrocery,
  deleteAllGroceries,
};
