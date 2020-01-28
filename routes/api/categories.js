const {
  Category,
  validateCategory,
  validateId
} = require("../../models/category");
const express = require("express");
const router = express.Router();

//==========================Get all Category=================================
router.get("/:storeId", async (req, res) => {
  const { error } = validateId(req.params); //cheq for req.params.id
  if (error) return res.status(400).send(error.details[0].message);

  const categories = await Category.find({ store: req.params.storeId });
  var newCategories = [];
  makeTree(res, categories, newCategories, 0);
});

//helper function for get all categories of any store
function makeTree(res, categories, newCategories, i) {
  var args = {
    fields: "_id name",
    minLevel: 2
  };

  if (i == categories.length) {
    res.send(newCategories);
    return;
  } else {
    categories[i].getChildrenTree(args, function(err, categoriesTree) {
      newCategories[i] = { ...categories[i]._doc, children: categoriesTree };
      makeTree(res, categories, newCategories, i + 1);
    });
  }
}

//==========================Insert Category=================================
router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category;
  if (req.body.parent) {
    const parent = await Category.findById(req.body.parent);
    category = new Category({
      name: req.body.name,
      parent: parent
    });
  } else {
    category = new Category({
      name: req.body.name,
      store: req.body.storeId
    });
  }
  category = await category.save();

  res.send(category);
});

//==========================Update Category=================================
router.put("/:id", async (req, res) => {
  // const { error } = validateCategory(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name
    },
    {
      new: true
    }
  ).exec();

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

//==========================Delete Category=================================
router.delete("/:id", async (req, res) => {
  var category = await Category.findById(req.params.id);
  //============parent can not delete option deleted
  // if(category.store){
  //     return res
  //       .status(403)
  //       .send("Deletion of parent category is Forbidden.");
  // }
  category = await category.deleteOne();

  //Delete all childeren of category
  let child;
  category.getChildren({}, { fields: "_id" }, true, async function(
    err,
    Children
  ) {
    let childrenArray = [];
    var i = 0;
    Children.forEach(element => {
      childrenArray[i] = element._id;
      i++;
    });
    child = await Category.deleteMany({ _id: { $in: childrenArray } }).exec();
  });

  //send respone as error or deleted category's object
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
  return;
});

router.get("/single/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
