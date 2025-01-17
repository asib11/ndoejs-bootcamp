const express = require("express");
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const app = express();


app.use('/admin', adminRouter);
app.use('/', publicRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
