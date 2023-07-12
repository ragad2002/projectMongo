// require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Model = require("./models/cat_M");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.get("/C/ADD", (req, res) => {
  res.render(__dirname +"/view/catAdd");
});
app.get('/add', (req, res) => {
  res.render(__dirname + "/view/Itemadd");
});
app.get('/ItemList', (req, res) => {
  res.render(__dirname + "/view/ItemList");
});
app.get('/EditItem/:itemId', (req, res) => {
  res.render(__dirname + "/view/EditItem");
});

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use(express.json({ extended: false }));

//routes
app.use("/C", require("./routes/cat_R"))
app.use("/P", require("./routes/item_R"))

app.post("/api/phase-durations", (req, res) => {
  try {
    let { duration } = req.body;
    Model.create({ duration: duration}).then(result => {
      res.json(result);
    }).catch(error => {
      console.error(error.message);
      res.status(500).send("Server Error");
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



app.get("/api/phase-durations", async (req, res) => {
  console.log("res");
  try {
    const catData = await Model.findOne();
    const duration = catData ? catData.duration : 0;

    res.json({ duration });
  } catch (error) {
    console.error("Error retrieving duration:", error);
    res.sendStatus(500);
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/project", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected....");
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});


