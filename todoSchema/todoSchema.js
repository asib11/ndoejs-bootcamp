const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user :{
    type : mongoose.Types.ObjectId,
    ref: "User"
  }
});

// instance method
todoSchema.methods = {
  findActive: () => {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

// static method
 /**
   * n static methods, this refers to the model when called properly. If you define the method with an arrow function (() => {}), this will not refer to the model but to the enclosing lexical scope.
   * Use a regular function (function) for static methods to ensure this points to the correct context.
   */
todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /js/i });
  },
};

// query helper

todoSchema.query = {
    byLanguage: function (language) {
      return this.find({ title: new RegExp(language, "i") });
    },
};

module.exports = todoSchema;
