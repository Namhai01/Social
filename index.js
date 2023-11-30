const express = require("express");
const app = express();
const connectDB = require("./db");
const session = require("express-session");
const passport = require("./passport_LocalStrategy");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Sử dụng Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
