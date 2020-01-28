const Joi = require("joi");
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    unique: true
  },
  description: {
    type: String,
    maxlength: 30
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  },
  theme: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  logo: {
    url: {
      type: String
    },
    caption: {
      type: String
    }
  },
  image: {
    url: {
      type: String
    },
    caption: {
      type: String
    }
  }
});

const Store = mongoose.model("Store", storeSchema);

function validateStore(store) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(20)
      .required(),
    description: Joi.string().max(30),
    userId: Joi.objectId().optional(),
    theme: Joi.string()
      .min(1)
      .max(50)
      .required(),
    logo: Joi.object()
      .keys({
        url: Joi.string().uri(),
        caption: Joi.string().optional()
      })
      .optional(),
    image: Joi.object()
      .keys({
        url: Joi.string().uri(),
        caption: Joi.string().optional()
      })
      .optional()
  };

  return Joi.validate(store, schema);
}

exports.storeSchema = storeSchema;
exports.Store = Store;
exports.validateStore = validateStore;
