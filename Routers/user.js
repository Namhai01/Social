const express = require("express");
const router = express.Router();
const passport = require("../Config/passport_LocalStrategy");
const { Register, Login, userInfo } = require("../Controllers/user");
const checkAuthentication = require("../Middlewares/checkAuthentication");

router.post("/Login", Login);

router.post("/Register", Register);

router.get("/userinfo", checkAuthentication, userInfo);

module.exports = router;
