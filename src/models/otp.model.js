const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    otp: {
      type: Number,
      default: 0,
      required: true,
      trim: true,
    },
    Status: {
      type: Boolean,
      default: false,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OTPModel = mongoose.model("otp", DataSchema);

module.exports = OTPModel;
