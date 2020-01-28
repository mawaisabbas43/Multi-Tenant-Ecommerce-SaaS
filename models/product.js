const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 150
  },
  lname: {
    //may be brand name
    type: String,
    minlength: 2,
    maxlength: 150
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  count: {
    type: Number,
    required: true,
    min: 0
  },
  summary: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 2000
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      caption: {
        type: String
      }
    }
  ],
  attributes: [
    {
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  variants: [
    {
      name: {
        type: String,
        required: true
      },
      options: [
        {
          type: String
        }
      ]
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  },
  updated: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    sku: Joi.string().required(),
    fname: Joi.string()
      .min(2)
      .max(150)
      .required(),
    lname: Joi.string()
      .min(2)
      .max(150)
      .optional(),
    price: Joi.number()
      .greater(-1)
      .required(),
    count: Joi.number()
      .integer()
      .greater(-1)
      .required(),
    summary: Joi.string()
      .max(100)
      .required(),
    description: Joi.string()
      .max(2000)
      .required(),
    images: Joi.array()
      .items(
        Joi.object().keys({
          url: Joi.string().required(),
          caption: Joi.string().optional()
        })
      )
      .optional(),
    attributes: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          value: Joi.string().required()
        })
      )
      .optional(), //may be error .with('name','value')
    variants: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          options: Joi.array()
            .items(Joi.string())
            .min(1)
            .required()
        })
      )
      .optional(),
    // variantName: Joi.string().optional(),
    // variants: Joi.array()
    //   .items(Joi.string())
    //   .optional(),
    storeId: Joi.objectId().required(),
    categories: Joi.array()
      .items(Joi.objectId())
      .min(1)
      .required()
  });
  return Joi.validate(product, schema);
}

function validateId(idParm) {
  const idSchema = {
    id: Joi.objectId().required()
  };

  return Joi.validate(idParm, idSchema);
}

function validateImages(imagesPar) {
  const imagesSchema = {
    images: Joi.array().items(
      Joi.object().keys({
        url: Joi.string().required(),
        caption: Joi.string().optional()
      })
    )
  };

  return Joi.validate(imagesPar, imagesSchema);
}

exports.productSchema = productSchema;
exports.validateImages = validateImages;
exports.Product = Product;
exports.validateProduct = validateProduct;
exports.validateId = validateId;
