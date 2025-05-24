const express = require("express");
const cors = require("cors");
const uploadRoute = require("./routes/uploadRoute.js");
const testRoute = require("./routes/testRoute.js");
const aiRoute = require("./routes/aiRoute.js");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/test", testRoute);
app.use("/api/ai", aiRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
