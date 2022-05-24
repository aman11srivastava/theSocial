const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const post = require("./routes/postRoutes");
const user = require("./routes/userRoutes");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/", post);
app.use("/api/", user);

module.exports = app;
