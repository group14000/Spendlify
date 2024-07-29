const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      user: req.user._id,
    });
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
};
