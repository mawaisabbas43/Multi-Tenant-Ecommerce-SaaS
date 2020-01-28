const {
  Product,
  validateProduct,
  validateId,
  validateImages
} = require("../../models/product");

const express = require("express");
const router = express.Router();

// to access products list on the base of category
router.get("/category/:id", async (req, res) => {
  const { error } = validateId(req.params); //cheq for req.params.id
  if (error) return res.status(400).send(error.details[0].message);

  const products = await Product.find({ categories: { $in: [req.params.id] } });
  res.send(products);
});

router.get("/store/:id", async (req, res) => {
  const { error } = validateId(req.params); //cheq for req.params.id
  if (error) return res.status(400).send(error.details[0].message);

  const products = await Product.find({ store: req.params.id }).sort(
    "-updated"
  );
  res.send(products);
});

router.post("/", async (req, res) => {
  //for instance
  let variants = [];
  if (req.body.options) {
    variants.push({ name: req.body.variantName, options: req.body.options });
  }
  delete req.body.variantName;
  req.body.variants = variants;
  delete req.body.options;

  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error); //.details[0].message);

  const product = new Product({
    sku: req.body.sku,
    fname: req.body.fname,
    lname: req.body.lname,
    price: req.body.price,
    count: req.body.count,
    summary: req.body.summary,
    description: req.body.description,
    // images: req.body.images,
    attributes: req.body.attributes,
    variants: req.body.variants,
    categories: req.body.categories,
    store: req.body.storeId
  });
  await product.save();

  res.send(product);
});

router.put("/images/:id", async (req, res) => {
  var images = [];
  if (req.files.file == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  let file = !Array.isArray(req.files.file) ? [req.files.file] : req.files.file;
  file.forEach(sFile => {
    images.push({
      caption: sFile.name,
      url: `/uploads/${req.params.id}-${sFile.name}`
    });
    sFile.mv(
      `${process.cwd()}/client/public/server/uploads/${req.params.id}-${
        sFile.name
      }`,
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      }
    );
  });
  req.body.images = images;
  const { error } = validateImages(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      images: req.body.images
    },
    {
      new: true
    }
  ).exec();

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.put("/editProduct/:id", async (req, res) => {
  let variants = [];
  if (req.body.options) {
    variants.push({ name: req.body.variantName, options: req.body.options });
  }
  req.body.variants = variants;
  delete req.body.options;
  // const { error } = validateProduct(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      sku: req.body.sku,
      fname: req.body.fname,
      lname: req.body.lname,
      price: req.body.price,
      count: req.body.count,
      summary: req.body.summary,
      description: req.body.description,
      attributes: req.body.attributes,
      variants: req.body.variants
    },
    {
      new: true
    }
  ).exec();

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.put("/editProductCategory/:id", async (req, res) => {
  // const { error } = validateProduct(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      categories: req.body.categories
    },
    {
      new: true
    }
  ).exec();

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndRemove({ _id: req.params.id }).exec();

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(product);
});

router.get("/single/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");
  res.send(product);
});

module.exports = router;
