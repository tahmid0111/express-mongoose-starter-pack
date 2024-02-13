const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    UserEmail: {
      type: String,
      required: true,
      trim: true,
    },
    Brand: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      required: true,
      trim: true,
    },
    Desc: {
      type: String,
      required: true,
      trim: true,
    },
    Image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", DataSchema);

module.exports = ProductModel;
