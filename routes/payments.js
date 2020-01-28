const express = require("express");
const router = express.Router();
const Security = require("../lib/Security");
const urlencodedParser = require("body-parser").urlencoded({ extended: true });
const paypal = require("paypal-rest-sdk");

//others
const { Product } = require("../models/product");
const Cart = require("../lib/Cart");
const { Order, validateOrder, validateId } = require("../models/order");
const { PaymentAccount } = require("../models/paymentAccount");

//security
const secret = require("../config/secret");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(secret.secretKey2);

//get request paypal
router.get("/", async (req, res) => {
  const paymentAccount = await PaymentAccount.findOne({
    store: res.locals.storeId
  });
  if (!paymentAccount || !paymentAccount.paypal.publicKey)
    return res.render(res.locals.theme + "/main/err", {
      code: 400,
      pageName: "",
      message: "PayPal Account is not Registered.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
  res.render(res.locals.theme + "/main/payment-paypal", {
    pageName: "",
    cart: cart,
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
});

router.get("/stripe", async (req, res) => {
  const paymentAccount = await PaymentAccount.findOne({
    store: res.locals.storeId
  });
  if (!paymentAccount || !paymentAccount.stripe.publicKey)
    return res.render(res.locals.theme + "/main/err", {
      code: 400,
      pageName: "",
      message: "Stripe Account is not Registered.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
  res.render(res.locals.theme + "/main/payment-stripe", {
    pageName: "",
    cart: cart,
    nonce: Security.md5(req.sessionID + req.headers["user-agent"]),
    keyPublishable: paymentAccount.stripe.publicKey
  });
});

router.post("/", urlencodedParser, async (req, res) => {
  const paymentAccount = await PaymentAccount.findOne({
    store: res.locals.storeId
  });
  if (!paymentAccount || !paymentAccount.paypal.secretKey)
    return res.render(res.locals.theme + "/main/err", {
      code: 400,
      pageName: "",
      message: "PayPal Account is not Registered.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  if (paymentAccount.paypal.secretKey)
    paymentAccount.paypal.secretKey = cryptr.decrypt(
      paymentAccount.paypal.secretKey
    );

  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: paymentAccount.paypal.publicKey,
    client_secret: paymentAccount.paypal.secretKey
  });
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
  let items = [];
  let itemsMongo = [];

  cart.items.forEach(item => {
    let itemNew = {
      name:
        item.fname + " (" + item.variant.name + ":" + item.variant.option + ")",
      price: item.price + ".00",
      currency: "USD",
      quantity: item.qty
    };
    itemsMongo.push({
      item: item.id,
      qty: item.qty,
      variant: item.variant,
      subTotal: item.subTotal
    });
    items.push(itemNew);
  });

  if (Security.isValidNonce(req.body.nonce, req) && cart.totals > 0) {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        //supposed and yet have to solve them
        return_url:
          "http://localhost:3000/" +
          res.locals.storeId +
          "/checkout/paypal/" +
          req.body.first_name +
          "/" +
          req.body.last_name +
          "/" +
          req.body.address +
          "/" +
          req.body.city +
          "/" +
          req.body.state +
          "/" +
          req.body.zip_code +
          "/" +
          req.body.country +
          "/" +
          req.body.phone_number +
          "/" +
          req.body.email_address +
          "/" +
          req.body.nonce,
        cancel_url: "http://localhost:3000/" + res.locals.storeId
      },
      transactions: [
        {
          item_list: {
            items: items
          },
          amount: {
            currency: "USD",
            total: cart.totals + ".00"
          },
          description: "" + JSON.stringify(req.body)
        }
      ]
    };
    paypal.payment.create(create_payment_json, async function(error, payment) {
      if (error) {
        return res.render(res.locals.theme + "/main/err", {
          code: error,
          pageName: "",
          message: "",
          nonce: Security.md5(req.sessionID + req.headers["user-agent"])
        });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href); //yet to do work
            // res.send(order);
          }
        }
      }
    });
  } else if (cart.totals <= 0) {
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message: "Cart is Empty or total price is less than 0",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  } else {
    res.redirect("/" + res.locals.storeId);
  }
});

router.get(
  "/paypal/:first_name/:last_name/:address/:city/:state/:zip_code/:country/:phone_number/:email_address/:nonce",
  async (req, res) => {
    let sess = req.session;
    let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
    let items = [];
    let itemsMongo = [];

    cart.items.forEach(item => {
      let itemNew = {
        name:
          item.fname +
          " (" +
          item.variant.name +
          ":" +
          item.variant.option +
          ")",
        price: item.price + ".00",
        currency: "USD",
        quantity: item.qty
      };
      itemsMongo.push({
        item: item.id,
        qty: item.qty,
        variant: item.variant,
        subTotal: item.subTotal
      });
      items.push(itemNew);
    });
    if (Security.isValidNonce(req.params.nonce, req) && cart.totals > 0) {
      // const { error } = validateOrder(req.body);
      // if (error)
      //   return res.render(res.locals.theme + "/main/err", {
      //     code: 400,
      //     pageName: "",
      //     message: error,
      //     nonce: Security.md5(req.sessionID + req.headers["user-agent"])
      //   });

      const order = new Order({
        fname: req.params.first_name,
        lname: req.params.last_name,
        address: req.params.address,
        city: req.params.city,
        state: req.params.state,
        zip: req.params.zip_code,
        country: req.params.country,
        phone: req.params.phone_number,
        email: req.params.email_address,
        paymentType: "PapPal Sendbox",
        items: itemsMongo,
        totals: cart.totals,
        formattedTotals: cart.formattedTotals,
        status: "Order Placed!",
        store: res.locals.storeId
      });
      await order.save();
      cart.items.forEach(async item => {
        await Product.findByIdAndUpdate(
          { _id: item.id },
          { $inc: { count: -item.qty } }
        ).exec();
      });
      Cart.emptyCart(req);
      res.redirect("/" + res.locals.storeId + "/myorders/id/" + order._id);
    } else if (cart.totals <= 0) {
      return res.render(res.locals.theme + "/main/err", {
        code: 404,
        pageName: "",
        message: "Cart is Empty or total price is less than 0",
        nonce: Security.md5(req.sessionID + req.headers["user-agent"])
      });
    } else {
      res.redirect("/" + res.locals.storeId);
    }
  }
);
router.post("/stripe", urlencodedParser, async (req, res) => {
  const paymentAccount = await PaymentAccount.findOne({
    store: res.locals.storeId
  });
  if (!paymentAccount || !paymentAccount.stripe.secretKey)
    return res.render(res.locals.theme + "/main/err", {
      code: 400,
      pageName: "",
      message: "Stripe Account is not Registered.",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  if (paymentAccount.stripe.secretKey)
    paymentAccount.stripe.secretKey = cryptr.decrypt(
      paymentAccount.stripe.secretKey
    );

  const stripe = require("stripe")(paymentAccount.stripe.secretKey);
  let sess = req.session;
  let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
  let itemsMongo = [];

  cart.items.forEach(item => {
    itemsMongo.push({
      item: item.id,
      variant: item.variant,
      qty: item.qty,
      subTotal: item.subTotal
    });
  });

  if (Security.isValidNonce(req.body.nonce, req) && cart.totals > 0) {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: cart.totals + "00", // need amount
          description: JSON.stringify(req.body) + JSON.stringify(itemsMongo), //"Order description", //need desc
          currency: "usd", //need currency type
          customer: customer.id
        })
      )
      .then(async charge => {
        let bodyCopy = { ...req.body };
        delete bodyCopy.stripeTokenType;
        delete bodyCopy.stripeToken;
        delete bodyCopy.stripeEmail;

        const { error } = validateOrder(bodyCopy);
        if (error)
          return res.render(res.locals.theme + "/main/err", {
            code: 400,
            pageName: "",
            message: error,
            nonce: Security.md5(req.sessionID + req.headers["user-agent"])
          });

        const order = new Order({
          fname: req.body.first_name,
          lname: req.body.last_name,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip_code,
          country: req.body.country,
          phone: req.body.phone_number,
          email: req.body.email_address,
          paymentType: "Stripe Sendbox",
          items: itemsMongo,
          totals: cart.totals,
          formattedTotals: cart.formattedTotals,
          status: "Order Placed!",
          store: res.locals.storeId
        });
        await order.save();
        cart.items.forEach(async item => {
          await Product.findByIdAndUpdate(
            { _id: item.id },
            { $inc: { count: -item.qty } }
          ).exec();
        });
        Cart.emptyCart(req);

        res.redirect("/" + res.locals.storeId + "/myorders/id/" + order._id);
      });
  } else if (cart.totals <= 0) {
    return res.render(res.locals.theme + "/main/err", {
      code: 404,
      pageName: "",
      message: "Cart is Empty or total price is less than 0",
      nonce: Security.md5(req.sessionID + req.headers["user-agent"])
    });
  } else {
    res.redirect("/" + res.locals.storeId);
  }
});

module.exports = router;
