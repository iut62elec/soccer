import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState({ file_name: "" });

  const handleInputChange = (e) => {
    setInputData({ file_name: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://qnnyj5ljke.execute-api.us-east-1.amazonaws.com/dev/SoccerStartSF-dev",
        inputData
      );
      console.log(response.data); // Response from the backend API
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Trigger AWS Step Function with Input Data</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          File Name:
          <input
            type="text"
            value={inputData.file_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
