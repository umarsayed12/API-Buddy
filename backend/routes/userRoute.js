import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").post(isAuthenticated, getUserProfile);

export default router;
