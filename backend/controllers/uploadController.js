const fs = require("fs");
const path = require("path");
const parsePostman = require("../services/parsePostman");

const handleUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", req.file.path);
    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    const parsedEndpoints = parsePostman(json);
    res.json({ endpoints: parsedEndpoints });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ error: "Failed to process file." });
  }
};

module.exports = { handleUpload };
