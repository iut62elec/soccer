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
  const [videodata, setVideodata] = useState({ status: "", final_highlight:"",final_original:"",id:""});
  const [showVideo, setShowVideo] = useState(false);
  const [SFARN, setSFARN] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [executionStatus, setExecutionStatus] = useState(null);
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
    setSubmitClicked(true);
    console.log(setSubmitClicked);
    const response = await fetch(API_post, {
    method: 'POST',
    mode: 'cors',
    headers: {
    },
    body: JSON.stringify(inputData),
    }).then(resp => resp.json()) // return a promise that resolves with the parsed JSON data
    .then(data => {console.log(data);setSFARN(data.executionArn);
    })
    .catch(error => {
      // handle any errors
      console.error('Error fetching data:', error);
    });

    // Poll the execution status until it is either SUCCEEDED or FAILED
    console.log(SFARN)
    let status;
    while (status !== 'SUCCEEDED' && status !== 'FAILED') {
      const executionResponse = await API.graphql(graphqlOperation(`query MyQuery {
        getSFworkflow(id: "${SFARN}") {
          id
          final_highlight
          final_original
          SFARN
          status
        }
      }`));
      console.log(executionResponse)
      //status='SUCCEEDED'
      //status = executionResponse.data.getExecutionStatus.status;
      //setExecutionStatus(status);
      // .then(res => {console.log(res.data.getSFworkflow);
      //   //setVideodata({id:res.data.getSFworkflow.id,final_highlight:res.data.getSFworkflow.final_highlight,final_original:res.data.getSFworkflow.final_original,status:res.data.getSFworkflow.status});
      //   //setExecutionStatus(res.data.getSFworkflow.status);
      //   console.log(res.data.getSFworkflow.status);
      // })
      // .catch(error => {
      // console.error('in progress :', error);});
      

      // Wait for 1 second before checking the status again
      await new Promise(resolve => setTimeout(resolve, 5000));  
    }

    

    
  };
  //console.log('here1');
  //
  //console.log('here2');
  // if (SFARN != null && SFARN !== '') {
  //   const SFARN_fake="arn:aws:states:us-east-1:456667773660:execution:soccer_highlights_march_23_V3:6ea7f411-f625-4f04-b125-eb98612c993b"
  //   console.log('here3');
  //   console.log(SFARN);
  //   API.graphql(graphqlOperation(`query MyQuery {
  //     getSFworkflow(id: "${SFARN_fake}") {
  //       id
  //       final_highlight
  //       final_original
  //       SFARN
  //       status
  //     }
  //   }`))
  //   .then(res => {console.log(res.data.getSFworkflow);
  //     setVideodata({id:res.data.getSFworkflow.id,final_highlight:res.data.getSFworkflow.final_highlight,final_original:res.data.getSFworkflow.final_original,status:res.data.getSFworkflow.status})
  //   })
  //   .catch(error => {
  //   console.error('Error check process:', error);});
  //   console.log('HERE')
  // }

  
// now with this execution ARN we can create an API and check the status 



// const checkProcessStatus = async () => {
//   const response = await API.graphql({ query: getSFworkflow, variables: {input: {id: SFARN}}})
//   const data = await response.json();
// };
  useEffect(() => {
    // Replace this with your backend API call to get notification when process finishes
    if (submitClicked) {
      // if (SFARN != null && SFARN !== '') {
      // //if (1==1){ 
      //   //const SFARN_fake="arn:aws:states:us-east-1:456667773660:execution:soccer_highlights_march_23_V3:6ea7f411-f625-4f04-b125-eb98612c993b"
      //   //console.log('here3');
      //   //console.log(SFARN);
      //   API.graphql(graphqlOperation(`query MyQuery {
      //     getSFworkflow(id: "${SFARN}") {
      //       id
      //       final_highlight
      //       final_original
      //       SFARN
      //       status
      //     }
      //   }`))
      //   .then(res => {console.log(res.data.getSFworkflow);
      //     setVideodata({id:res.data.getSFworkflow.id,final_highlight:res.data.getSFworkflow.final_highlight,final_original:res.data.getSFworkflow.final_original,status:res.data.getSFworkflow.status})
      //   })
      //   .catch(error => {
      //   console.error('Error check process:', error);});
      //   console.log('HERE')
      // }
    console.log(submitClicked)  
    //setSubmitClicked(false);  
    const checkProcessStatus = async () => {
      //const response = await fetch('/api/process-status')
      //const data = await response.json();
      if (videodata.status === 'Succeeded') {
        setShowVideo(true);
      }
    };
    //checkProcessStatus(); //this should be un-comment, was commented to remove error..
    }
  }, [submitClicked]);

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
      {SFARN && (
        <p>Execution ARN: {SFARN}</p>
      )}
      {executionStatus && (
        <p>Execution status: {executionStatus}</p>
      )}
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
