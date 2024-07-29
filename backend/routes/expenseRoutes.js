const express = require("express");
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/expenses", auth, expenseController.createExpense);
router.get("/expenses", auth, expenseController.getExpenses);
router.get("/expenses/:id", auth, expenseController.getExpense);
router.patch("/expenses/:id", auth, expenseController.updateExpense);
router.delete("/expenses/:id", auth, expenseController.deleteExpense);

module.exports = router;
