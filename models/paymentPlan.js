const Joi = require("joi");
const mongoose = require("mongoose");

const paymentPlanSchema = new mongoose.Schema({
  productQty: {
    type: Number,
    minlength: 1
  },
  productFee: {
    type: Number,
    minlength: 0
  },
  storeFee: {
    type: Number,
    minlength: 1
  },
  totals: {
    type: Number
  },
  paymentType: {
    type: String,
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  },
  date: { type: Date }
});

const PaymentPlan = mongoose.model("PaymentPlan", paymentPlanSchema);

function validateId(idParm) {
  const idSchema = {
    id: Joi.objectId().required()
  };

  return Joi.validate(idParm, idSchema);
}

exports.paymentPlanSchema = paymentPlanSchema;
exports.PaymentPlan = PaymentPlan;
exports.validateId = validateId;
