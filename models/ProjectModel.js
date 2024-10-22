import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: true,
  },
  prazo: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String], // Altera para um array de strings
    default: [],
  },
  description: {
    type: String,
  },
});

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;

/*
      id: stationId,
      key: Date.now(),
      tag: "Novo Projeto",
      title: title,
      prazo: prazo,
*/
