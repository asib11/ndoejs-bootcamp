const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  todos:[{
    type: mongoose.Types.ObjectId,
    ref : "Todo"
  }]
  
});



module.exports = userSchema;
