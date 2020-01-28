const { ContactUs, validateContactUs } = require("../../models/contactUs");
const express = require("express");
const router = express.Router();

router.get("/:storeId", async (req, res) => {
  const contactUs = await ContactUs.find({ store: req.params.storeId });
  if (!contactUs)
    return res.status(400).send("contactUs not found for this store.");

  res.send(contactUs);
});

router.post("/", async (req, res) => {
  const { error } = validateContactUs(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const contactUs = new ContactUs({
    description: req.body.description,
    map: req.body.mapUrl,
    addresses: req.body.addresses,
    phones: req.body.phones,
    emails: req.body.emails,
    store: req.body.storeId
  });
  await contactUs.save();

  res.send(contactUs);
});

router.put("/:id", async (req, res) => {
  // const { error } = validateContactUs(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const contactUs = await ContactUs.findOneAndUpdate(
    { _id: req.params.id },
    {
      description: req.body.description,
      map: req.body.mapUrl,
      addresses: req.body.addresses,
      phones: req.body.phones,
      emails: req.body.emails
    },

    {
      new: true
    }
  ).exec();

  if (!contactUs)
    return res
      .status(404)
      .send("The contactUs with the given ID was not found.");

  res.send(contactUs);
});

router.delete("/:id", async (req, res) => {
  const contactUs = await ContactUs.findOneAndDelete({
    _id: req.params.id
  }).exec();

  if (!contactUs)
    return res
      .status(404)
      .send("The contactUs with the given ID was not found.");

  res.send(contactUs);
});

router.get("/single/:id", async (req, res) => {
  const contactUs = await ContactUs.findById(req.params.id);

  if (!contactUs)
    return res
      .status(404)
      .send("The contactUs with the given ID was not found.");

  res.send(contactUs);
});

module.exports = router;
