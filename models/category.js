const Joi = require('joi');
const tree = require('mongoose-data-tree');
const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Store'
    }
});
categorySchema.plugin(tree);
const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    
    var  schema= Joi.object({
            name: Joi.string().min(2).max(50).required(),
            storeId: Joi.objectId().optional(),
            parent:Joi.objectId().optional()
        }).nand("storeId","parent");

    return Joi.validate(category, schema);
}
function validateId(storeId){
    const idSchema= {
        storeId: Joi.objectId().required()
    };

    return Joi.validate(storeId,idSchema);
}

exports.categorySchema=categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;
exports.validateId = validateId;
