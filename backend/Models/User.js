const { required } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String||Number,
    required: true,
  },
});


const User=mongoose.model("users",UserSchema)
module.exports=User