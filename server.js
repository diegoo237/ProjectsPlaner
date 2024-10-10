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

app.put("/projects/:id/tags", async (req, res) => {
  const { tag } = req.body;
  const projectId = req.params.id;

  // Verifica se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID do projeto inválido" });
  }

  try {
    // Verifica se o projeto existe
    const projectExists = await ProjectModel.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Atualiza o projeto adicionando a nova tag
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $push: { tags: tag } },
      { new: true }
    );

    res.status(200).json(updatedProject); // Retorna o projeto atualizado
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
    res.status(500).json({ error: "Erro ao adicionar tag" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
