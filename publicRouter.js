const express = require("express");

publicRouter = express.Router();

// const log = (req, res, next) =>{
//     console.log('this is public log')
//     next()
// }

// publicRouter.all("*", log);

// publicRouter.param('user', (req, res, next, id) =>{
//     req.user = id === 1 ? 'admin' : 'anonymous';
//     console.log('I am colled once!')
//     next();
// })

// publicRouter.get('/:user', (req, res, next) => {
//   console.log('This also match')
//   next();
// })



publicRouter.get("/", (req, res) => {
  res.send("welcome");
});

publicRouter.get("/about", (req, res) => {
  res.send("about");
});

publicRouter
  .route("/class")
  .all((req, res, next) => {
    console.log("this is route of router");
    next();
  })
  .get((req, res) => {
    res.send("this is user get");
  })
  .put((req, res) => {
    res.send("this is user put");
  })
  .post((req, res) => {
    res.send("this is user post");
  })
  .delete((req, res) => {
    res.send("this is user delete");
  });


publicRouter.param((param, option) => (req, res, next, val) => {
  if (val === option) {
    next();
  } else {
    res.sendStatus(403);
  }
});

publicRouter.param("user", "2");

publicRouter.get("/:user", (req, res) => {
  res.send(`I am Admin`);
});

module.exports = publicRouter;
