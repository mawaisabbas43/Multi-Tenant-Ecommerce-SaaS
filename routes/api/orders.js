const { Order, validateId } = require("../../models/order");

const express = require("express");
const router = express.Router();

router.get("/store/:id", async (req, res) => {
  const { error } = validateId(req.params); //cheq for req.params.id
  if (error) return res.status(400).send(error.details[0].message);

  const orders = await Order.find({ store: req.params.id })
    .populate({
      path: "items.item",
      select: "sku fname price summary images"
    })
    .sort("-date")
    .exec();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: "items.item",
      select: "sku fname price summary images"
    })
    .exec();

  if (!order)
    return res.status(404).send("The Order with the given ID was not found.");
  res.send(order);
});

router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete({ _id: req.params.id }).exec();

  if (!order)
    return res.status(404).send("The Order with the given ID was not found.");
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate({
    status: req.body.status
  }).exec();

  if (!order)
    return res.status(404).send("The Order with the given ID was not found.");
  res.send(order);
});
module.exports = router;
