import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All Fields are Required.",
      });
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPass,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log("Registration Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error : Failed to Register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All Fields are Required.",
      });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials. Please try again!",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials. Please try again!",
      });
    }
    generateToken(res, user, `Welcome Back ${user.name}`);
  } catch (error) {
    console.log("Login Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error : Failed to Login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User Logged Out Successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Logout Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error : Failed to Logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password"); //it will select/fetch everything except password
    if (!user) {
      return res.status(404).json({
        message: "User Profile Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Profile Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error : Failed to fetch User Profile",
    });
  }
};
