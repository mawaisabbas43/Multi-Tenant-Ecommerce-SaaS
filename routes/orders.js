const { Order, validateId } = require("../models/order");

const express = require("express");
const router = express.Router();
const Security = require("../lib/Security");

router.get("/email", async (req, res) => {
  const orders = await Order.find({
    email: req.query.email,
    phone: req.query.phone,
    fname: req.query.fname,
    lname: req.query.lname,
    store: res.locals.storeId
  }).exec();
  if (!orders[0])
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message:
        "Your given detail Email,phone,first name or last name is wrong!",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  res.render(res.locals.theme + "/main/orderlist", {
    orders,
    pageName: "orderlist",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
  // res.send(orders);
});

router.get("/id", async (req, res) => {
  const { error } = validateId(req.query);
  if (error)
    return res.render(res.locals.theme + "/main/err", {
      code: 400,
      pageName: "",
      message: error.details[0].message,
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });

  res.redirect("/" + res.locals.storeId + "/myorders/id/" + req.query.id);
});

router.get("/id/:id", async (req, res) => {
  const { error } = validateId(req.params);
  if (error)
    if (error)
      return res.render(res.locals.theme + "/main/err", {
        code: 400,
        pageName: "",
        message: error.details[0].message,
        nonce: Security.md5(req.sessionID + req.headers["user-agent"])
      });

  const order = await Order.findOne({
    _id: req.params.id,
    store: res.locals.storeId
  })
    .populate({
      path: "items.item",
      select: "sku fname price summary images"
    })
    .exec();
  if (!order)
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message: "The Order with the given ID was not found.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });

  res.render(res.locals.theme + "/main/orderdetails", {
    order: order,
    pageName: "orderdetails",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

module.exports = router;
