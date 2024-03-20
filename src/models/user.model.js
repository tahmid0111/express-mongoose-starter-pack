const mongoose = require("mongoose");

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]{2})(?=.*[!@#$%^&*()\-+=])[A-Za-z0-9!@#$%^&*()\-+=]{8,}$/;

const DataSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 12,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 12,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: emailRegex,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
      match: passwordRegex,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", DataSchema);

module.exports = UserModel;
