const Joi = require('joi');
const mongoose = require('mongoose');

const contactUsSchema=new mongoose.Schema({
    description: {
        type: String,
        maxlength:50,
        required:true
    },
    map: {
        type: String
    },
    addresses:[{
        type: String,
        maxlength:150
    }],
    phones:[{
        type: String,
        maxlength:150
    }],
    emails:[{
        type: String,
        maxlength:150
    }],
    store:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Store'
    }
});

const ContactUs=mongoose.model('ContactUs',contactUsSchema);

function validateContactUs(contactUs){
    const schema= {
            description: Joi.string().max(50).required(),
            mapUrl: Joi.string().uri().optional(),
            addresses:Joi.array().items(Joi.string()),
            phones: Joi.array().items(Joi.string()),
            emails: Joi.array().items(Joi.string().email()),
            storeId: Joi.objectId().optional()
        };

    return Joi.validate(contactUs, schema);
}

exports.contactUsSchema=contactUsSchema;
exports.ContactUs = ContactUs;
exports.validateContactUs = validateContactUs;