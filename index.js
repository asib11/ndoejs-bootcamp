const express = require("express");
const fs = require('fs');
const app = express();

//asynonous error
app.get('/', (req, res, next) =>{
  setTimeout(function() {
    try {
      console.log(a);
    } catch (err) {
      next(err)
    }
  } , 100)
});

//  handle asynconous error by synconous error
app.get('/class',[ (req, res, next) =>{ // we know that we can chain middleware by array
  fs.readFile('/file-not-exist', 'utf-8', (err, data) =>{
    console.log(data);
    next(err)
  })
},
(req, res, next) =>{ // sync errir by default error
  console.log(data.property)
}
])

// custom error message

app.use((err, req, res, next) =>{
  if(res.headerSent) {
    next('there was a problem')
  } else {
    if (err.message){
      res.status(500).send(err.message)
    }else {
      res.send('there was an error')
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
