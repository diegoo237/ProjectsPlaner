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
    const savedProject = await newProject.save(); // Salva o projeto e armazena o objeto salvo

    // Retorna o projeto recém-criado
    res.status(201).json(savedProject); // Retorna o projeto criado com status 201
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error while saving data");
  }
});

app.delete("/projects/:id", async (req, res) => {
  const projectId = req.params.id;
  console.log(`Recebendo solicitação para deletar o projeto: ${projectId}`);

  // Verifica se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID do projeto inválido" });
  }

  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    // Adicione log para verificar se o projeto foi encontrado e deletado
    console.log(`Resultado da deleção: ${deletedProject}`);

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

app.put("/projects/:id/tag", async (req, res) => {
  const { tag } = req.body; // Espera um objeto com a propriedade 'tag'
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID do projeto inválido" });
  }

  // Verifica se a tag foi passada como string
  if (!tag || typeof tag !== "string") {
    return res.status(400).json({ error: "Tag inválida ou não fornecida" });
  }

  try {
    const projectExists = await ProjectModel.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Usa $push para adicionar a nova tag ao array de tags
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $push: { tags: tag } }, // Adiciona a tag ao array
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
