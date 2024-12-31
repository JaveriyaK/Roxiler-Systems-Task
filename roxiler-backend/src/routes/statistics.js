const express = require("express");
const router = express.Router();
const { getStatistics } = require("../services/statisticsService");

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const stats = await getStatistics(month);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
