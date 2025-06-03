import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getHistory, saveHistory } from "../controllers/historyController.js";

const router = express.Router();

router.route("/save-history").post(isAuthenticated, saveHistory);
router.route("/get-history").get(isAuthenticated, getHistory);

export default router;
