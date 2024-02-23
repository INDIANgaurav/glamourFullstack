const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({
        success: true,
        message: "Sign-up successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "please signup first",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      success: true,
      message: "login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async(req, res) => {
  try {
   return res
   .status(200)
   .clearCookie("token",{
    httpOnly: true,
      secure: true,
   }).json({
      success: true,
      message: "logout successful",
    },
    {
        new : true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    },

    );
  }
};

const getUser = async (req, res) => {
  const reqId = req.id;

  try {
    let user = await User.findById(reqId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, message: "User found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//reset password route
const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const generateOtp = Math.floor(Math.random() * 10000);
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: " please signup ",
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "58ed9883aefb68",
        pass: "9e649a36149e65",
      },
    });
    const info = await transporter.sendMail({
      from: "parasarg57@gmail.com", // sender address
      to: email, // list of receivers
      subject: "New OTP has been generated", // Subject line
      html: `<h3>Your generated OTP is : <i>${generateOtp}</i>  </h3>`, // html body
    });
    if (info.messageId) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: generateOtp,
          },
        }
      );
      return res.status(200).json({
        success: true,

        message: "OTP has been sent to your email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  const { otp, newPassword } = req.body;
  try {
    const securePassword = await bcrypt.hash(newPassword, 10);
    let user = await User.findOneAndUpdate(
      { otp },
      {
        $set: {
          password: securePassword,
          otp: 0,
        },
      }
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: " OTP is not valid ",
      });
    }
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signup, login, logout, getUser, resetPassword, verifyOTP };
