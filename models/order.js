const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    maxlength: 150
  },
  lname: {
    type: String,
    maxlength: 150
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15
  },
  email: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      variant: {
        name: {
          type: String
        },
        option: {
          type: String
        }
      },
      qty: {
        type: Number
      },
      subTotal: {
        type: String
      }
    }
  ],
  totals: {
    type: Number
  },
  formattedTotals: {
    type: String
  },
  status: {
    type: String
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    first_name: Joi.string()
      .max(150)
      .required(),
    last_name: Joi.string()
      .max(150)
      .optional(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    // paymentType: Joi.string().required(),
    phone_number: Joi.string()
      .max(15)
      .required(),
    email_address: Joi.string()
      .email()
      .required(),
    nonce: Joi.string().required()
    // items: Joi.array().items(
    //   Joi.object().keys({
    //     item: Joi.objectId().required(),
    //     subTotal: Joi.string().optional()
    //   })
    // ),
    // totals: Joi.number().required(),
    // formattedTotals: Joi.string().required(),
    // storeId: Joi.objectId().required()
  });
  return Joi.validate(order, schema);
}

function validateId(idParm) {
  const idSchema = {
    id: Joi.objectId().required()
  };

  return Joi.validate(idParm, idSchema);
}

exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validateOrder = validateOrder;
exports.validateId = validateId;
