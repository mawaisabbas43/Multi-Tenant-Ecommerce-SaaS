// const {User} = require('../../models/user');
const { Store, validateStore } = require("../../models/store");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stores = await Store.find();
  res.send(stores);
});

router.get("/:id", async (req, res) => {
  const store = await Store.find({ user: req.params.id });
  if (!store) return res.status(400).send("Store not found for this User.");

  res.send(store);
});

router.post("/", async (req, res) => {
  const { error } = validateStore(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const store = new Store({
    name: req.body.name,
    description: req.body.description,
    user: req.body.userId,
    theme: req.body.theme
  });
  await store.save();

  res.send(store);
});

router.put("/:id", async (req, res) => {
  const { error } = validateStore(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const store = await Store.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      description: req.body.description,
      theme: req.body.theme
    },

    {
      new: true
    }
  ).exec();

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

router.put("/logo/:id", async (req, res) => {
  if (req.files.file == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  let logo = {
    caption: req.files.file.name,
    url: `/uploads/${req.params.id}-${req.files.file.name}`
  };
  req.files.file.mv(
    `${process.cwd()}/client/public/server/uploads/${req.params.id}-${
      req.files.file.name
    }`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );

  const store = await Store.findOneAndUpdate(
    { _id: req.params.id },
    {
      logo: logo
    },
    {
      new: true
    }
  ).exec();

  if (!store)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(store);
});

router.put("/image/:id", async (req, res) => {
  if (req.files.file == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  let image = {
    caption: req.files.file.name,
    url: `/uploads/${req.params.id}-${req.files.file.name}`
  };
  req.files.file.mv(
    `${process.cwd()}/client/public/server/uploads/${req.params.id}-${
      req.files.file.name
    }`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );

  const store = await Store.findOneAndUpdate(
    { _id: req.params.id },
    {
      image: image
    },
    {
      new: true
    }
  ).exec();

  if (!store)
    return res.status(404).send("The Product with the given ID was not found.");

  res.send(store);
});

router.delete("/:id", async (req, res) => {
  const store = await Store.findOneAndDelete({ _id: req.params.id }).exec();

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

router.get("/single/:id", async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

module.exports = router;
