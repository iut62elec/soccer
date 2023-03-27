import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState({ file_name: "" });
  const [showVideo, setShowVideo] = useState(false);
  const [SFARN, setSFARN] = useState("");

  const API_post="https://qnnyj5ljke.execute-api.us-east-1.amazonaws.com/dev/SoccerStartSF-dev"
  const API_GET="https://qnnyj5ljke.execute-api.us-east-1.amazonaws.com/dev/SoccerStartSF-dev"
  const handleInputChange = (e) => {
    setInputData({ file_name: e.target.value });
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post(
  //     API_post,
  //       inputData
  //     );
  //     console.log(response.data); // Response from the backend API
  // };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_post, {
    method: 'POST',
    mode: 'cors',
    headers: {
    },
    body: JSON.stringify(inputData),
    }).then(resp => resp.json()) // return a promise that resolves with the parsed JSON data
    .then(data => {console.log(data);setSFARN(data.executionArn)})
    .catch(error => {
      // handle any errors
      console.error('Error fetching data:', error);
    });
    
  };
  console.log(SFARN)
  useEffect(() => {
    // Replace this with your backend API call to get notification when process finishes
    const checkProcessStatus = async () => {
      const response = await fetch('/api/process-status')
      const data = await response.json();
      if (data.status === 'finished') {
        setShowVideo(true);
      }
    };
    //setShowVideo(true)
    //checkProcessStatus();
  }, []);

  return (
    <div>
      <h1>Input Video File name and hit submit!</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          File Name:
          <input
            type="text"
            value={inputData.file_name}
            onChange={handleInputChange}
          />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    <br></br>
      {showVideo ? (
        <video src="https://d35nrjxlam6z0e.cloudfront.net/videoplayback_iran-from-13-to-16HL.mp4" controls />
      ) : (
        <p>Waiting for process to finish...</p>
      )}
    </div>
  );
}

export default App;
