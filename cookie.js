var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

//middleware
app.use(cookieParser());

//settings
app.set("view engine", "ejs");
app.set("views", "./views");

const products = [
  { id: 1, name: "shirts" },
  { id: 2, name: "pants" },
  { id: 3, name: "jacket" },
  { id: 4, name: "shoes" }
];

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
  res.render("products", { products: products });
});

app.get("/cart", (req, res) => {
  if (!req.cookies.cart) {
    res.send("Empty!");
  }
  var cart = req.cookies.cart;

  res.render("cart", { products: products, cart: cart });
});

app.get("/cart/:id", (req, res) => {
  var id = req.params.id;
  if (!req.cookies.cart) {
    var cart = {};
  } else {
    var cart = req.cookies.cart;
  }

  if (!cart[id]) {
    cart[id] = 0;
  } else {
    cart[id] = parseInt(cart[id]);
  }

  cart[id] += 1;
  res.cookie("cart", cart);
  res.redirect("/cart");
});

app.get("/cart/delete/:id", (req, res) => {
  var id = req.params.id;
  if (req.cookies.cart) {
    var cart = req.cookies.cart;
    if (cart[id] >= 1) {
      cart[id] = parseInt(cart[id]) - 1;
    } else if (cart[id] === 0) {
      cart[id] = null;
    }

    res.cookie("cart", cart);
  }

  res.redirect("/cart");
});

app.listen(8081, () => {
  console.log("Server listening at port 8081");
});
