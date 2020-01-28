const Joi = require("joi");
const mongoose = require("mongoose");

const paymentAccountSchema = new mongoose.Schema({
  cashOnDelivery: {
    type: Boolean
  },
  stripe: {
    publicKey: {
      type: String
    },
    secretKey: {
      type: String
    }
  },
  paypal: {
    publicKey: {
      type: String
    },
    secretKey: {
      type: String
    }
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  }
});

const PaymentAccount = mongoose.model("PaymentAccount", paymentAccountSchema);

function validatePaymentAccount(paymentAccount) {
  const schema = {
    cashOnDelivery: Joi.boolean(),
    stripe: Joi.object()
      .keys({
        publicKey: Joi.string(),
        secretKey: Joi.string()
      })
      .optional(),
    paypal: Joi.object()
      .keys({
        publicKey: Joi.string(),
        secretKey: Joi.string()
      })
      .optional(),
    storeId: Joi.objectId().optional()
  };

  return Joi.validate(paymentAccount, schema);
}

exports.paymentAccountSchema = paymentAccountSchema;
exports.PaymentAccount = PaymentAccount;
exports.validatPaymentAccount = validatePaymentAccount;
