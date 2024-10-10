import express from "express";
import cors from "cors";
import connectDB from "./Database.js";
import dotenv from "dotenv";
import ProjectModel from "./models/ProjectModel.js";
import ProjectstationModel from "./models/ProjectstationModel.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

app.post("/projects", async (req, res) => {
  try {
    const { title, station, prazo } = req.body;

    const newProject = new ProjectModel({ title, station, prazo });
    await newProject.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error while saving data");
  }
});

app.get("/stations", async (req, res) => {
  try {
    const stations = await ProjectstationModel.find();
    res.status(200).json(stations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar stations dos projetos", error });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar os projetos", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
