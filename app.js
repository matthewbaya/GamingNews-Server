const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//router
app.use(router);
app.get("/tes", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
