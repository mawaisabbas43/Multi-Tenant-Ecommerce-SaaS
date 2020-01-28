const {Feedback,validateFeedback}= require('../../models/feedback');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/:storeId', async (req, res) => {

    const feedbacks = await Feedback.find({store:req.params.storeId});
    if (!feedbacks) return res.status(400).send('feedbacks not found for this store.');

    res.send(feedbacks);
});

router.post('/',urlencodedParser, async (req, res) => {

    const { error } = validateFeedback(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const feedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      store: req.body.storeId
    });
    await feedback.save();
    req.flash('Sent', 'Message sent Successfully!');

    res.redirect("/"+req.body.storeId+"/contact-us");
  });

router.put('/:id', async (req, res) => {
    const { error } = validateFeedback(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const feedback = await Feedback.findOneAndUpdate({ _id: req.params.id },
        {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        },

        {
            new: true
        }).exec();

    if (!feedback) return res.status(404).send('The feedback with the given ID was not found.');

    res.send(feedback);
});

router.delete('/:id', async (req, res) => {
    const feedback = await Feedback.findOneAndDelete({_id:req.params.id}).exec();
  
    if (!feedback) return res.status(404).send('The feedback with the given ID was not found.');
  
    res.send(feedback);
});


router.get("/single/:id", async (req, res) => {
    const feedback = await Feedback.findById(req.params.id);
  
    if (!feedback)
      return res
        .status(404)
        .send("The feedback with the given ID was not found.");
  
    res.send(feedback);
  });
  
  module.exports = router;

