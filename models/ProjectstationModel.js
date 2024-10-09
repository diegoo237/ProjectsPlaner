import mongoose from "mongoose";

const ProjectstateSchema = new mongoose.Schema({
  state: { type: String, required: true },
});

const ProjectstationModel = mongoose.model("stations", ProjectstateSchema);

export default ProjectstationModel;
