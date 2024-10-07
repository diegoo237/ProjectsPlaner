import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente

const uri = process.env.SERVER_MONGO_URL; // Obtém a URL do MongoDB
console.log("MongoDB URI:", uri); // Adicione isto antes da conexão
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Success, connected to MongoDB");
  } catch (error) {
    console.log("MongoDB error", error.message);
  }
};

export default connectDB;
