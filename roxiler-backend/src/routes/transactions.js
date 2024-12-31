const express = require("express");
const router = express.Router();
const { getTransactions } = require("../services/transactionService");

router.get("/", async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const transactions = await getTransactions(month, search, page, perPage);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
