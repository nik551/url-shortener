const express = require("express");
const { connectToMongoDb } = require("./connect.js");

const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Mongo DB cnnected"))
  .catch((err) => console.log("Mongo Err", err));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server has started"));
