const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 12,
      match: /^[A-Za-z\s]+$/,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 12,
      match: /^[A-Za-z\s]+$/,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    Mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Country: {
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

const UserModel = mongoose.model("users", DataSchema);

module.exports = UserModel;
