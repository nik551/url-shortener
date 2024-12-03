const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connect.js");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly,checkAuth } = require("./middleware/auth.js");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Mongo DB cnnected"))
  .catch((err) => console.log("Mongo Err", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/",checkAuth, staticRoute);
app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.listen(PORT, () => console.log("Server has started"));
