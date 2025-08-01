import express from "express";
import dotenv from "dotenv";
import upload from "./middlewares/upload.js";
import fileUploader from "./utils/fileUploader.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);

    const response = await fileUploader(req.file.buffer);

    res.json({ message: "File uploaded successfully!", data: response });
  } catch (error) {
    res.status(500).json({ message: "File upload failed!", error });
  }
});

app.listen(PORT, () => { console.log(`Server Running on http://localhost:${PORT}`)})