require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//router
app.use(router);
app.get("/tes", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
