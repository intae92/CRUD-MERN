const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    require: true,
  },
  daysSinceIAte: {
    type: Number,
    require: true,
  },
});

const Food = mongoose.model("FoodData", FoodSchema);
module.exports = Food;
