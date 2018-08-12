var express = require("express");
var session = require("express-session");
var app = express();

//middleware
app.use(
  session({
    secret: "sdlkfjsd123213!@#",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/count", (req, res) => {
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count++;
  }

  res.send("count: " + req.session.count);
});

app.get("/tmp", (req, res) => {
  res.send("session.count: " + req.session.count);
});

app.listen(8081, () => {
  console.log("session.js listening at 8081 port");
});
