const Joi = require("joi");
const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 50,
    required: true
  },
  info: {
    type: String,
    minlength: 20,
    required: true
  },
  moreInfo: {
    type: String,
    minlength: 20,
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store"
  }
});

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

function validateAboutUs(aboutUs) {
  const schema = {
    description: Joi.string()
      .max(50)
      .required(),
    info: Joi.string()
      .min(20)
      .required(),
    moreInfo: Joi.string()
      .min(20)
      .required(),
    storeId: Joi.objectId().optional()
  };

  return Joi.validate(aboutUs, schema);
}

exports.aboutUsSchema = aboutUsSchema;
exports.AboutUs = AboutUs;
exports.validateAboutUs = validateAboutUs;
