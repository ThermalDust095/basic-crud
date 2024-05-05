const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    legs: Number,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Animal", animalSchema);
