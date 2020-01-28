const express = require("express");
const router = express.Router();
const Security = require("../lib/Security");
const urlencodedParser = require("body-parser").urlencoded({ extended: true });

const { Product } = require("../models/product");
const Cart = require("../lib/Cart");

router.get("/", async (req, res) => {
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;

  res.render(res.locals.theme + "/main/cart", {
    pageName: "",
    cart: cart,
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

router.post("/update", urlencodedParser, async (req, res) => {
  let ids = req.body.product_id;
  let qtys = req.body.qty;
  let variName = req.body.variantName;
  let variOption = req.body.variantOption;
  if (Security.isValidNonce(req.body.nonce, req)) {
    let cart = req.session.cart ? req.session.cart : null;
    let i = !Array.isArray(ids) ? [ids] : ids;
    let q = !Array.isArray(qtys) ? [qtys] : qtys;
    let variNames = !Array.isArray(variName) ? [variName] : variName;
    let variOptions = !Array.isArray(variOption) ? [variOption] : variOption;

    Cart.updateCart(i, q, variNames, variOptions, cart);
    res.redirect("/" + res.locals.storeId + "/cart");
  } else {
    res.redirect("/" + res.locals.storeId);
  }
});

router.post("/", urlencodedParser, async (req, res) => {
  let qty = parseInt(req.body.qty, 10);
  if (qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
    Product.findById(req.body.productId)
      .select("_id fname price images variants")
      .then(prod => {
        let cart = req.session.cart ? req.session.cart : null;
        let variName = null,
          vari = null;
        if (prod.variants[0] != null) {
          variName = prod.variants[0].name;
          vari = {
            name: variName,
            option: req.body[variName]
          };
        }
        Cart.addToCart(prod, qty, vari, cart);

        res.redirect("/" + req.body.storeId + "/cart");
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.redirect("/" + req.body.storeId);
  }
});

router.get("/remove/:id/:variName/:variOption/:nonce", (req, res) => {
  let id = req.params.id;
  const vari = { name: req.params.variName, option: req.params.variOption };
  if (Security.isValidNonce(req.params.nonce, req)) {
    Cart.removeFromCart(id, vari, req.session.cart);
    res.redirect("/" + res.locals.storeId + "/cart");
  } else {
    res.redirect("/" + res.locals.storeId);
  }
});

router.get("/empty/:nonce", (req, res) => {
  if (Security.isValidNonce(req.params.nonce, req)) {
    Cart.emptyCart(req);
    res.redirect("/" + res.locals.storeId + "/cart");
  } else {
    res.redirect("/" + res.locals.storeId);
  }
});

module.exports = router;
