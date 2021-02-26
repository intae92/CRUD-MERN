const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

//Frontend 데이터 받을 수 있음
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://newuser:passworduser@crud.h0i3m.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName, daysSinceIAte: days });
  //.
  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    //먼저 데이터가 있는지 확인
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
    });
    res.send("updated data");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
