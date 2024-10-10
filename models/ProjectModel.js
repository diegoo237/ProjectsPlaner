import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  title: String,
  station: String,
  prazo: Date,
  tags: [{ type: String }],
});

export default mongoose.model("projects", DataSchema);
/*
      id: stationId,
      key: Date.now(),
      tag: "Novo Projeto",
      title: title,
      prazo: prazo,
*/
