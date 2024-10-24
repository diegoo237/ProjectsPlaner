import express from "express";
import cors from "cors";
import connectDB from "./Database.js";
import dotenv from "dotenv";
import ProjectModel from "./models/ProjectModel.js";
import ProjectstationModel from "./models/ProjectstationModel.js";
import mongoose from "mongoose";

dotenv.config();

connectDB();

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

// Busca as stations no banco
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

// Busca os projetos no banco
app.get("/projects", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar os projetos", error });
  }
});

// Cria um novo projeto
app.post("/projects", async (req, res) => {
  try {
    const { title, station, prazo } = req.body;

    const newProject = new ProjectModel({ title, station, prazo });
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error while saving data");
  }
});

// Deleta um projeto
app.delete("/projects/:id", async (req, res) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID do projeto inválido" });
  }

  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.status(200).json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    res
      .status(500)
      .json({ error: "Erro ao deletar projeto", details: error.message });
  }
});

// Cria ou atualiza a descrição do projeto
app.put("/projects/:id", async (req, res) => {
  const { description, prazo, station } = req.body;
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID do projeto inválido" });
  }

  try {
    const projectExists = await ProjectModel.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { description, prazo, station }, // Atualiza os campos description e prazo
      { new: true, upsert: true } // Opções: retorna o novo documento atualizado e faz upsert
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Erro ao atualizar o projeto:", error);
    res.status(500).json({
      error: "Erro ao atualizar o projeto",
      details: error.message,
    });
  }
});

// Adiciona nova tag ao projeto
app.put("/projects/:id/tag", async (req, res) => {
  const { tag } = req.body;
  const projectId = req.params.id;

  if (!tag || typeof tag !== "string") {
    return res.status(400).json({ error: "Tag inválida ou não fornecida" });
  }

  try {
    const projectExists = await ProjectModel.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $push: { tags: tag } },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
    res
      .status(500)
      .json({ error: "Erro ao adicionar tag", details: error.message });
  }
});

// Remove uma tag do projeto
app.delete("/projects/:id/tag", async (req, res) => {
  const { tag } = req.body;
  const projectId = req.params.id;

  if (!tag || typeof tag !== "string") {
    return res.status(400).json({ error: "Tag inválida ou não fornecida" });
  }

  try {
    const projectExists = await ProjectModel.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $pull: { tags: tag } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Tag não encontrada" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Erro ao remover tag:", error);
    res
      .status(500)
      .json({ error: "Erro ao remover tag", details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
