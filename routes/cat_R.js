const express = require('express');
const router = express.Router();
const catModel = require("../models/cat_M");

router.get('/Add', (req, res) => {
  res.render("catAdd", {
    pageTitle: "הוספת קטגוריה",
    item: {}
  });
});

router.post('/Add',(req, res) => {
  const modelData = new catModel({
      name:req.body.name
  });
  modelData.save();
  res.redirect("/C/List");
});
router.get('/List', (req, res) => {
  let cat_data=new  catModel.find();
  res.render("catList", {pageTitle:"ניהול קטגוריות",
      data:cat_data
  });
});


router.get('/Edit', (req, res) => {
  let item_data=new catModel.findById(req.query.id);
  res.render("catAdd", {pageTitle:"עריכת קטיגוריה",
      item:item_data
  });
});
router.post('/Edit', (req, res) => {
  const modelData = {
  name:req.body.name
  };
  let item_data=new  catModel.findByIdAndUpdate(req.query.id,modelData);
  res.redirect("/C/List");
});


router.post('/Delete', (req, res) => {
  let item_data=new  catModel.findByIdAndDelete(req.body.id);
  res.redirect("/C/List");
});

module.exports = router;
