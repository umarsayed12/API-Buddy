const express = require("express");
const { explainFailure } = require("../controllers/aiController.js");
const {
  explainSecurityWarning,
} = require("../controllers/aiWarningExplain.js");
const router = express.Router();

router.post("/explain", explainFailure);
router.post("/explain-security-warnings", explainSecurityWarning);

module.exports = router;
