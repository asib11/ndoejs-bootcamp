const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../todoSchema/userSchema");
const User = new mongoose.model("User", userSchema); // always model varible name convention start with capital and singular name and its a class so use new keyword

//signup
route.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "signup successfuly",
    });
  } catch (err) {
    res.status(500).json({ error: "SignUp Failed!!!" });
  }
});

//login
route.post("/login", async (req, res) => {
  try {
    const user = await User.find({ userName: req.body.userName });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        //generToken
        const token = jwt.sign(
          {
            userName: user[0].userName,
            userID: user[0]._id,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "login successfully",
        });
      } else {
        res.status(401).json({ error: "authentication failed" });
      }
    } else {
      res.status(401).json({ error: "authentication failed" });
    }
  } catch (err) {
    res.status(401).json({ error: "authentication failed" });
  }
});

route.get('/all', async (req, res) => {
  try {
      const users = await User.find({
          
      }).populate("todos");

      res.status(200).json({
          data: users,
          message: "Success"
      });
  } catch(err) {
      console.log(err);
      res.status(500).json({
          message: "There was an error on the server side!"
      });
  }
});


module.exports = route;
