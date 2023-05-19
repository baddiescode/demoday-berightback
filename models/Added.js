const mongoose = require("mongoose");

const AddedSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
      },
    rating: {
          type: String,
          required: true,
        },
    price: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },
    phone: {
        type: String,
        required: true,
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

module.exports = mongoose.model("Added", AddedSchema);