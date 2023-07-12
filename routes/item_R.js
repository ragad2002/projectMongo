const express = require("express");
const router = express.Router();
const ItemModel = require("../models/item_M");

router.get("/list", (req, res) => {
  ItemModel.find({})
    .then(ItemData => {
      if (ItemData) {
        res.status(200).json({ msg: "Success", ItemData });
      }
    })
    .catch(error => {
      console.error("Error retrieving", error);
      res.sendStatus(500);
    });
});

router.post("/Add", (req, res) => {
  const modelData = new ItemModel({
    name: req.body.name,
    catg: req.body.catg,
  });

  modelData
    .save()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  ItemModel.findByIdAndUpdate(id, req.body)
    .then(item_data => {
      if (item_data) {
        res.status(200).json({ message: "successfully updated", item_data });
      }
    })
    .catch(err => {
      console.error("Error updating item:", id, err);
    });
});

router.get("/item/:id", (req, res) => {
  const { id } = req.params;
  ItemModel.findById(id)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "successfully retrieved", result });
      }
    })
    .catch(err => {
      console.error("Error retrieving item:", id, err);
    });
});

router.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  ItemModel.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "successfully deleted", result });
      }
    })
    .catch(err => {
      console.error("Error deleting item:", id, err);
    });
});

module.exports = router;
