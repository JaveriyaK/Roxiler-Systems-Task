const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index"); // Combines all routes
require("dotenv").config(); // For environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
