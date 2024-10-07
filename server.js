import express from "express";
import cors from "cors";
import connectDB from "./Database.js";
import dotenv from "dotenv";
import DataModel from "./DataModel.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/readfromserver", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error while fetching data" });
  }
});

app.post("/writetodatabase", async (req, res) => {
  try {
    const { content } = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error while saving data");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
