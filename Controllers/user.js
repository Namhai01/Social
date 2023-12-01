const bcrypt = require("bcrypt");
const User = require("../Models/user");

module.exports.Login = async () => {};

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

    res.json({ status: "Success", message: "" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", Message: "Lỗi trong quá trình đăng ký" });
  }
};
