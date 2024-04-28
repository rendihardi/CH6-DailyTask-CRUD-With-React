require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ImageKit = require("imagekit");
const cors = require("cors"); // Tambahkan ini

const router = require("./routes");

const PORT = process.env.PORT || "3000";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "rahasia",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

app.use(upload.single("photo"));

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

app.use(cors()); // Tambahkan ini

app.use((req, res, next) => {
  if (req.file) {
    const imagePath = path.join(__dirname, "uploads", req.file.filename);
    imagekit.upload(
      {
        file: fs.createReadStream(imagePath),
        fileName: req.file.filename,
      },
      (err, result) => {
        if (err) {
          console.error("Error uploading image to ImageKit:", err);
          return next(err);
        }
        req.imageUrl = result.url;
        fs.unlinkSync(imagePath);
        next();
      }
    );
  } else {
    next();
  }
});

app.use(flash());
app.use(morgan("dev"));
app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`SERVER JALAN DI PORT : ${PORT}`);
});
