import axios from "axios";
import AppNav from "../components/AppNav";
import { useEffect, useState } from "react";

function Read() {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/readfromserver"
        );
        setServerData(response.data);
      } catch (error) {
        console.log("Error fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AppNav />
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : serverData.length > 0 ? (
          serverData.map((item, index) => <div key={index}>{item.content}</div>)
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
}

export default Read;
