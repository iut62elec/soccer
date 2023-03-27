import React, { useState, useEffect } from "react";
import axios from "axios";
import "@aws-amplify/ui-react/styles.css"; // default theme
import { Flex, AmplifyProvider } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { getSFworkflow } from './graphql/queries'
import {Amplify, API, Auth, graphqlOperation, Storage} from 'aws-amplify'
import {  withAuthenticator, AmplifyS3Image } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [inputData, setInputData] = useState({ file_name: "" });
  const [videodata, setVideodata] = useState({ "status": "", "final_highlight":"","final_original":""});
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
// now with this execution ARN we can create an API and check the status 

useEffect(()=>{
 
  // API.graphql(graphqlOperation(GetSFworkflow))
  // .then(response => console.log(response.data))
  // .then(error => console.log(error))
  
},[]);


  useEffect(() => {
    // Replace this with your backend API call to get notification when process finishes
    const checkProcessStatus = async () => {
      const response = await API.graphql({ query: getSFworkflow, variables: {input: {id: SFARN}}})
      const data = await response.json();
  };
    
    // const checkProcessStatus = async () => {
    //   const response = await fetch('/api/process-status')
    //   const data = await response.json();
    //   if (data.status === 'finished') {
    //     setShowVideo(true);
    //   }
    // };
    checkProcessStatus(); //this should be un-comment, was commented to remove error..
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

//export default App;
export default withAuthenticator(App);
