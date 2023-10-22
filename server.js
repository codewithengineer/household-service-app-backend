const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.disable("x-powered-by");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ msg: "server is up and running" });
});

app.use("/", require("./routes"));

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port: " + process.env.PORT);
});
