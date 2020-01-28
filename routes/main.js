const express = require("express");
const Security = require("../lib/Security");
const router = express.Router();
const config = require("../config/secret");

// const _ = require('lodash');
// require('deepdash')(_);

const { Store } = require("../models/store");
const { Product } = require("../models/product");
const { Order } = require("../models/order");
const { Category, validateId } = require("../models/category");
const { AboutUs } = require("../models/aboutUs");
const { ContactUs } = require("../models/contactUs");
const { PaymentAccount } = require("../models/paymentAccount");

router.param("storeId", async function(req, res, next, storeId) {
  if (req.params.storeId == "api") return next();
  const parmObject = { storeId: req.params.storeId };
  const { error } = validateId(parmObject);
  if (error) return res.status(400).send(error.details[0].message);

  const categories = await Category.find({ store: req.params.storeId }).sort(
    "name"
  );

  const store = await Store.findById(req.params.storeId);
  if (!store) return res.send("Store not found!");
  res.locals.theme = store.theme;
  res.locals.store = store;

  res.locals.email = null;
  res.locals.phone = null;
  const contactUs = await ContactUs.findOne({ store: req.params.storeId });
  if (contactUs) {
    if (contactUs.emails[0]) res.locals.email = contactUs.emails[0];
    if (contactUs.phones[0]) res.locals.phone = contactUs.phones[0];
  }

  let format = new Intl.NumberFormat(config.locale.lang, {
    style: "currency",
    currency: config.locale.currency
  });

  res.locals.storeId = req.params.storeId;
  if (!req.session.cart) {
    req.session.cart = {
      items: [],
      totals: 0.0,
      formattedTotals: format.format(0.0)
    };
  }
  res.locals.cart = req.session.cart;
  res.locals.paymentAccount = {};
  const paymentAccount = await PaymentAccount.findOne({
    store: req.params.storeId
  });
  if (!paymentAccount) {
    res.locals.paymentAccount.paypal = false;
    res.locals.paymentAccount.stripe = false;
    res.locals.paymentAccount.cash = false;
  } else {
    if (paymentAccount.paypal.secretKey)
      res.locals.paymentAccount.paypal = true;
    if (paymentAccount.stripe.secretKey)
      res.locals.paymentAccount.stripe = true;
    res.locals.paymentAccount.cash = paymentAccount.cashOnDelivery;
  }

  var newCaegories = [];
  makeTree(res, categories, newCaegories, 0, next);
});

//helper function for get all categories of any store
function makeTree(res, categories, newCaegories, i, next) {
  var args = {
    fields: "_id name",
    minLevel: 2
  };

  if (i == categories.length) {
    res.locals.categories = newCaegories;
    return next();
  } else {
    categories[i].getChildrenTree(args, function(err, categoriesTree) {
      newCaegories[i] = { ...categories[i]._doc, children: categoriesTree };
      makeTree(res, categories, newCaegories, i + 1, next);
    });
  }
}

router.get("/:storeId", async (req, res) => {
  const { error } = validateId(req.params);
  if (error) return res.status(400).send(error.details[0].message);
  let productMap = await getPopular(req.params.storeId);
  const ids = [...productMap.keys()];
  let popular = { length: 0 };
  if (ids.length > 0) {
    popular = await Product.find({
      _id: { $in: ids }
    })
      .select("fname price images")
      .limit(8);
  }
  if (!popular.length) popular = { length: 0 };
  const otherProductLimit = 8 - ids.length;
  let newArrivals = { length: 0 };
  newArrivals = await Product.find({ store: req.params.storeId })
    .select("fname price images")
    .limit(otherProductLimit + 4)
    .sort("-updated");
  if (!newArrivals.length) newArrivals = { length: 0 };
  // res.send("hello");
  res.render(res.locals.theme + "/main/home", {
    newArrivals: newArrivals,
    popular,
    pageName: "home",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

async function getPopular(storeId) {
  let productMap = new Map();
  const productIds = await Order.find({ store: storeId })
    .select("-_id items.item items.qty")
    .limit(100)
    .sort("-date");
  productIds.forEach(element => {
    element.items.forEach(single => {
      if (productMap.has(single.item.toString())) {
        productMap.set(
          single.item.toString(),
          productMap.get(single.item.toString()) + single.qty
        );
      } else {
        productMap.set(single.item.toString(), single.qty);
      }
    });
  });

  productMap = new Map([...productMap.entries()].sort((a, b) => b[1] - a[1]));
  return productMap;
}
router.get("/:storeId/*", async (req, res, next) => {
  return next();
});

router.post("/:storeId/*", async (req, res, next) => {
  return next();
});

router.get("/:storeId/about-us", async (req, res, next) => {
  const aboutUs = await AboutUs.findOne({ store: req.params.storeId });
  if (!aboutUs)
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message: "About Us page not found for this store.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  res.render(res.locals.theme + "/main/aboutus", {
    aboutUs: aboutUs,
    pageName: "aboutUs",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

router.get("/:storeId/contact-us", async (req, res) => {
  const contactUs = await ContactUs.findOne({ store: req.params.storeId });
  if (!contactUs)
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message: "Contact Us page not found for this store.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });

  res.render(res.locals.theme + "/main/contact", {
    contactUs: contactUs,
    message: req.flash("Sent"),
    pageName: "contactUs",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

router.get("/:storeId/cart", async (req, res) => {
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;

  res.render(res.locals.theme + "/main/cart", {
    pageName: "",
    cart: cart,
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

router.get("/:storeId/orders", async (req, res) => {
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;

  res.render(res.locals.theme + "/main/vieworder", {
    pageName: "myorders",
    cart: cart,
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

module.exports = router;
