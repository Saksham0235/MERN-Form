const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User Already Exists!", success: false });
    }

    const userModel = new UserModel({ name, email, password });
    //  Before Saving user to the database We are encrypting the password
    // So that anyone having access to db can tsee password
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res
      .status(200)
      .json({ message: "User Created Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "User Doesn't Exists!", success: false });
    }

    //  Checking password funcitonality
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res
        .status(403)
        .json({ message: "User Doesn't Exists!", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({
        message: "Login  Successfully",
        success: true,
        jwtToken,
        email,
        name:user.name,
      });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {signup,login};
