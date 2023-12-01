const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Register, Login } = require("../Controllers/user");

router.post("/Login", passport.authenticate("local", {}), Login);

router.post("/Register", Register);

module.exports = router;
