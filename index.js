const express = require("express");
const mongoose = require("mongoose");
const handleRoute = require('./handleRoute/handleRoute');

require('dotenv').config()

const app = express();
app.use(express.json());

mongoose
  .connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.hhelgf3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use('/todo', handleRoute);

// function errorHandler(err, req, res, next){
//   if(res.headerSent){
//     return next(err);
//   }
//   res.status(500).json({error : err})
// };

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
