var express = require("express");
var app = express();

app.get("/count", (req, res) => {
  res.send("count : ");
});

app.listen(8081, () => {
  console.log("Server listening at port 8081");
});
