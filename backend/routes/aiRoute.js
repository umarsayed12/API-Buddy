const express = require("express");
const { explainFailure } = require("../controllers/aiController.js");

const router = express.Router();

router.post("/explain", explainFailure);

module.exports = router;
