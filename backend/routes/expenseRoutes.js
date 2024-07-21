const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

router.get("/", authMiddleware, expenseController.getExpenses);

router.post(
  "/",
  [
    authMiddleware,
    [
      check("amount", "Amount is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],
  expenseController.addExpense
);

router.delete("/:id", authMiddleware, expenseController.deleteExpense);

module.exports = router;
