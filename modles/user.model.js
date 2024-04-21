const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String,
  },
  admin:{
    type: Boolean,
    default:false
  },
  superadmin:{
    type: Boolean,
    default:false
  },
});

module.exports = mongoose.model("User", UserSchema);
