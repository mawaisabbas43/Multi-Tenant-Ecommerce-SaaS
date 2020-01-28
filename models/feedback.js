const Joi = require('joi');
const mongoose = require('mongoose');

const feedbackSchema=new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject:{
        type:String
    },
    message: {
        type: String
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Store'
    },
    date: { type: Date, default: Date.now }
});

const Feedback=mongoose.model('Feedback',feedbackSchema);

function validateFeedback(feedback){
    const schema= {
            name: Joi.string(),
            email: Joi.string().email(),
            subject:Joi.string(),
            message: Joi.string(),
            storeId: Joi.objectId().optional()
        };

    return Joi.validate(feedback, schema);
}

exports.feedbackSchema=feedbackSchema;
exports.Feedback = Feedback;
exports.validateFeedback = validateFeedback;