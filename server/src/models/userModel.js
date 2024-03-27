const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  address: String,
  image:String,
});

const UserModel = mongoose.model("crud-operation", userSchema);

module.exports = UserModel;

