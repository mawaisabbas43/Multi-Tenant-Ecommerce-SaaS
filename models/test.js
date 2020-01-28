const mongoose = require('mongoose');
const MpathPlugin =require('mongoose-mpath');
// const {subCategorySchema}=require('./subCategory');
const tree = require('mongoose-data-tree');

const testSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: String
    }
});
// testSchema.plugin(MpathPlugin);
testSchema.plugin(tree,{
    pathSeparator : '#' ,
    onDelete :     'DELETE',
    numWorkers:     5      ,
    idType:         mongoose.Schema.ObjectId
  });
const Test = mongoose.model('Test', testSchema);


// exports.testSchema=testSchema;
exports.Test = Test;