const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  description: { type: String },
  receiver: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Expense", expenseSchema);
