import axios from "axios";
import { useState } from "react";
import AppNav from "../components/AppNav";

function Write() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const saveData = async () => {
    try {
      await axios.post("http://localhost:5000/writetodatabase", {
        content: inputValue,
      });
      setMessage("Data saved successfully!");
      setInputValue("");
    } catch (error) {
      setMessage("Error while saving data: " + error.message);
      console.log("Error while saving dude:", error.message);
    }
  };

  return (
    <div>
      <AppNav />
      <input
        type="text"
        placeholder="Enter something"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={saveData}>Save data to MongoDB</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Write;
