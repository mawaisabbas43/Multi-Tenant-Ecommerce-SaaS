const { AboutUs, validateAboutUs } = require("../../models/aboutUs");
const express = require("express");
const router = express.Router();

router.get("/:storeId", async (req, res) => {
  const aboutUs = await AboutUs.find({ store: req.params.storeId }); //yet
  if (!aboutUs)
    return res.status(400).send("aboutUs not found for this store.");

  res.send(aboutUs);
});

router.post("/", async (req, res) => {
  const { error } = validateAboutUs(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const aboutUs = new AboutUs({
    description: req.body.description,
    info: req.body.info,
    moreInfo: req.body.moreInfo,
    store: req.body.storeId
  });
  await aboutUs.save();

  res.send(aboutUs);
});

router.put("/:id", async (req, res) => {
  // const { error } = validateAboutUs(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const aboutUs = await AboutUs.findOneAndUpdate(
    { _id: req.params.id },
    {
      description: req.body.description,
      info: req.body.info,
      moreInfo: req.body.moreInfo
    },

    {
      new: true
    }
  ).exec();

  if (!aboutUs)
    return res.status(404).send("The aboutUs with the given ID was not found.");

  res.send(aboutUs);
});

router.delete("/:id", async (req, res) => {
  const aboutUs = await AboutUs.findOneAndDelete({ _id: req.params.id }).exec();

  if (!aboutUs)
    return res.status(404).send("The aboutUs with the given ID was not found.");

  res.send(aboutUs);
});

router.get("/single/:id", async (req, res) => {
  const aboutUs = await AboutUs.findById(req.params.id);

  if (!aboutUs)
    return res.status(404).send("The aboutUs with the given ID was not found.");

  res.send(aboutUs);
});

module.exports = router;
