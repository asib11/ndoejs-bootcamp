const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const UPLOADS_FOLDER = "./uploads/";

// define the storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    console.log(file, fileName + fileExt);
    cb(null, fileName + fileExt);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "picture") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only .jpg, .png or .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else cb(new Error("only .pdf allowed!"));
    } else {
      cb(new Error("There was an unkonwn error"));
    }
  },
});

app.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "doc", maxCount: 2 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("hello Asib");
  }
);

// define error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
