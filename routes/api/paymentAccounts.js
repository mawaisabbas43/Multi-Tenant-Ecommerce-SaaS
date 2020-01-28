const {
  PaymentAccount,
  validatPaymentAccount
} = require("../../models/paymentAccount");
const express = require("express");
const router = express.Router();

//security
const secret = require("../../config/secret");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(secret.secretKey2);

router.get("/:id", async (req, res) => {
  const paymentAccount = await PaymentAccount.findOne({ store: req.params.id });
  if (!paymentAccount)
    return res.status(400).send("Not any Payment Account Registered.");
  if (paymentAccount.paypal.secretKey)
    paymentAccount.paypal.secretKey = cryptr.decrypt(
      paymentAccount.paypal.secretKey
    );
  if (paymentAccount.stripe.secretKey)
    paymentAccount.stripe.secretKey = cryptr.decrypt(
      paymentAccount.stripe.secretKey
    );

  res.send(paymentAccount);
});

router.put("/paypal/:id", async (req, res) => {
  const { error } = validatPaymentAccount(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  req.body.paypal.secretKey = cryptr.encrypt(req.body.paypal.secretKey);
  let paymentAccount = await PaymentAccount.findOne({ store: req.params.id });
  if (paymentAccount) {
    paymentAccount = await PaymentAccount.findOneAndUpdate(
      { store: req.params.id },
      {
        paypal: req.body.paypal
      },

      {
        new: true
      }
    ).exec();
  } else {
    paymentAccount = new PaymentAccount({
      cashOnDelivery: false,
      paypal: req.body.paypal,
      store: req.params.id
    });

    await paymentAccount.save();
  }
  if (!paymentAccount)
    return res.status(404).send("The Payment Accounts is not added.");

  res.send(paymentAccount);
});

router.put("/stripe/:id", async (req, res) => {
  const { error } = validatPaymentAccount(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  req.body.stripe.secretKey = cryptr.encrypt(req.body.stripe.secretKey);

  let paymentAccount = await PaymentAccount.findOne({ store: req.params.id });
  if (paymentAccount) {
    paymentAccount = await PaymentAccount.findOneAndUpdate(
      { store: req.params.id },
      {
        stripe: req.body.stripe
      },

      {
        new: true
      }
    ).exec();
  } else {
    paymentAccount = new PaymentAccount({
      cashOnDelivery: false,
      stripe: req.body.stripe,
      store: req.params.id
    });

    await paymentAccount.save();
  }

  if (!paymentAccount)
    return res
      .status(404)
      .send("The Payment Accounts with the given store ID was not found.");

  res.send(paymentAccount);
});

//to update cash on delivery
router.put("/:id", async (req, res) => {
  const { error } = validatPaymentAccount(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let paymentAccount = await PaymentAccount.findOne({ store: req.params.id });
  if (paymentAccount) {
    paymentAccount = await PaymentAccount.findOneAndUpdate(
      { store: req.params.id },
      {
        cashOnDelivery: req.body.cashOnDelivery
      },

      {
        new: true
      }
    ).exec();
  } else {
    paymentAccount = new PaymentAccount({
      cashOnDelivery: req.body.cashOnDelivery,
      store: req.params.id
    });

    paymentAccount = await paymentAccount.save();
  }
  if (!paymentAccount)
    return res
      .status(404)
      .send("The Payment Accounts with the given store ID was not found.");

  res.send(paymentAccount);
});

module.exports = router;
