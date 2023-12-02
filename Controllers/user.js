const bcrypt = require("bcrypt");
const passport = require("../Config/passport_LocalStrategy");
const User = require("../Models/user");
//AUTHENTICATION
module.exports.Login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ status: "Error", message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ status: "Success" });
    });
  })(req, res, next);
};

module.exports.Register = async (req, res) => {
  try {
    if (!req.body) {
      return res.json({ status: "error", Message: "Dữ liệu không đầy đủ" });
    }

    const { email, username, password, gender } = req.body;

    if (!email || !username || !password || !gender) {
      return res.json({ status: "error", Message: "Dữ liệu không đầy đủ" });
    }

    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegexp.test(email)) {
      return res.json({ status: "error", Message: "Email không hợp lệ" });
    }

    const checkUser = await User.findOne({ userName: username });

    if (checkUser) {
      return res.json({ status: "error", Message: "Username đã được sử dụng" });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    await User.create({
      password: hash,
      email,
      gender,
      username: username,
    });

    res.json({ status: "Success", message: "Bạn đã đăng kí thành công !" });
  } catch (error) {
    console.log(error.errmsg);
    if (error.code === 11000) {
      res.json({
        status: "error",
        Message: "Email đã được sử dụng!",
      });
    } else {
      res
        .status(500)
        .json({ status: "error", Message: "Lỗi trong quá trình đăng ký" });
    }
  }
};
//USER
module.exports.userInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.passport.user });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
