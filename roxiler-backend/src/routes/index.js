const express = require("express");
const router = express.Router();
const transactionRoutes = require("./transactions");
const statisticsRoutes = require("./statistics");
const chartRoutes = require("./charts");

router.use("/transactions", transactionRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/charts", chartRoutes);

module.exports = router;
