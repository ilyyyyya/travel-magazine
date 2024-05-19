const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const authController = require("./controllers/authController");
const pathController = require("./controllers/pathController");
const uploadController = require("./controllers/uploadController");
const dotenv = require('dotenv').config();
const app = express();

//connect db
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Db is connected"))
    .catch(err => console.error("Error connecting to db:", err));

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));
app.use("/auth", authController);
app.use("/path", pathController);
app.use("/upload", uploadController);
//start server
app.listen(process.env.PORT || 5000, () => console.log('server started'));
