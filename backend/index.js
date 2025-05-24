const express = require("express");
const cors = require("cors");
const uploadRoute = require("./routes/uploadRoute");
const testRoute = require("./routes/testRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/test", testRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
