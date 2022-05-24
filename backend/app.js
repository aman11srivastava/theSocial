const express = require("express");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}
const app = express();

module.exports = app;
