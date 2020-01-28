const { PaymentPlan, validateId } = require("../../models/paymentPlan");
const express = require("express");
const router = express.Router();
const config = require("../../config/secret");
const stripe = require("stripe")(config.stripe.secretKey);
router.get("/:id", async (req, res) => {
  const paymentPlan = await PaymentPlan.findone({ store: req.params.storeId });
  if (!paymentPlan)
    return res.status(400).send("paymentPlan not found for this store.");

  res.send(paymentPlan);
});

router.get("/", async (req, res) => {
  const paymentPlans = await PaymentPlan.find();
  if (!paymentPlans) return res.status(400).send("paymentPlan not found");

  res.send(paymentPlans);
});

router.post("/", async (req, res) => {
  try {
    const qty = parseInt(req.body.productQty, 10);
    const totals = config.plan.storeFee + config.plan.productFee * qty;
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: totals + "00", // need amount
          description: JSON.stringify(req.body),
          currency: "usd",
          customer: customer.id
        })
      )
      .then(async charge => {
        const paymentPlan = new PaymentPlan({
          productQty: qty,
          productFee: config.plan.productFee,
          storeFee: config.plan.storeFee,
          totals: totals,
          paymentType: req.body.paymentType,
          store: req.body.storeId,
          date: Date.now
        });
        await paymentPlan.save();
        res.send(paymentPlan);
      });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const qty = parseInt(req.body.productQty, 10);
    const totals = config.plan.storeFee + config.plan.productFee * qty;
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: totals + "00", // need amount
          description: JSON.stringify(req.body),
          currency: "usd",
          customer: customer.id
        })
      )
      .then(async charge => {
        const paymentPlan = await PaymentPlan.findOneAndUpdate(
          { _id: req.params.id },
          {
            productQty: qty,
            productFee: config.plan.productFee,
            storeFee: config.plan.storeFee,
            totals: totals,
            paymentType: req.body.paymentType,
            date: Date.now
          },
          {
            new: true
          }
        ).exec();
        if (!paymentPlan)
          return res
            .status(404)
            .send("The paymentPlan with the given ID was not found.");

        res.send(paymentPlan);
      });
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
