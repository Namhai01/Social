const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");
const session = require("express-session");
const passport = require("./Config/passport_LocalStrategy");
const MongoStore = require("connect-mongo");
const Auth_router = require("./Routers/user");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    name: "sessionName",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      dbName: "Session_db",
      stringify: false,
    }),
    cookie: {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    },
  })
);
// Sử dụng Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use("/api/auth", Auth_router);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
