const express = require("express");
const router = express.Router();
const { getBarChartData, getPieChartData } = require("../services/chartService");

router.get("/bar-chart", async (req, res) => {
  try {
    const { month } = req.query;
    const barChartData = await getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pie-chart", async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await getPieChartData(month);
    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
