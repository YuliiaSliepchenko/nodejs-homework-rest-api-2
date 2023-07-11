const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const DB_HOST = process.env.DB_HOST;

const contactsRouter = require("./routes/api/contacts");

const app = express();

app.set("json spaces", 8);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"));

module.exports = app;
