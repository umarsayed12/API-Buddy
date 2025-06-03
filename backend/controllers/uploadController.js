import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import to handle __dirname
import parsePostman from "../services/parsePostman.js";

// Get __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const filePath = path.join(__dirname, "..", req.file.path);

    // Read the file asynchronously
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);

    // Handle the parsing with proper error handling
    let parsedEndpoints;
    try {
      parsedEndpoints = parsePostman(json);
    } catch (parseError) {
      console.error("Postman parsing failed:", parseError.message);
      return res.status(400).json({ error: "Failed to parse Postman data." });
    }

    res.json({ endpoints: parsedEndpoints });

    // Delete the file asynchronously
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ error: "Failed to process file." });
  }
};
