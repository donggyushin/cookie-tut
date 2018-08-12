var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

//middleware
app.use(cookieParser());

app.get("/count", (req, res) => {
  if (req.cookies.count) {
    var counter = req.cookies.count;
  } else {
    var counter = 0;
  }
  counter = parseInt(counter) + 1;
  res.cookie("count", counter);
  res.send("count : " + counter);
});

app.get("/products", (req, res) => {
  res.send("products");
});

app.listen(8081, () => {
  console.log("Server listening at port 8081");
});
