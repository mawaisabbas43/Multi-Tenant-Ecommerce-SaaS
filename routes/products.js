const { Product, validateId } = require("../models/product");
const { Category } = require("../models/category");
const Security = require("../lib/Security");

const express = require("express");
const router = express.Router();

// to access products list on the base of category
router.get("/category/:id", async (req, res) => {
  const { error } = validateId(req.params); //cheq for req.params.id
  if (error) return res.status(400).send(error.details[0].message);

  const products = await Product.find({
    categories: { $in: [req.params.id] }
  }).select("fname price images count");
  const category = await Category.findById(req.params.id).populate("parent");

  category.getAncestors(function(err, ancestors) {
    if (category.parent) {
      category.parent.getChildren(function(err, rCategories) {
        res.render(res.locals.theme + "/main/shop", {
          products: products,
          category: category,
          ancestors: ancestors,
          rCategories: rCategories,
          pageName: "categories",
          nonce: Security.md5(req.sessionID + req.headers["user-agent"])
        });
      });
    } else {
      res.render(res.locals.theme + "/main/shop", {
        products: products,
        category: category,
        ancestors: ancestors,
        rCategories: [],
        pageName: "categories",
        nonce: Security.md5(req.sessionID + req.headers["user-agent"])
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  const relatedProducts = await Product.find({
    categories: { $in: product.categories }
  })
    .select("fname price images")
    .limit(4);
  res.render(res.locals.theme + "/main/product", {
    product: product,
    rProducts: relatedProducts,
    pageName: "",
    nonce: Security.md5(req.sessionID + req.headers["user-agent"])
  });
  // res.send(res.locals);
});

module.exports = router;
