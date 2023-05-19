const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
    location: {
      type: String,
      required: true,
    },
    date: {
        type: String,
        required: true,
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tripID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

module.exports = mongoose.model("Destination", DestinationSchema);