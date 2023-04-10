import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [imageUrl, setImageUrl] = useState("");
  const [videoList, setVideoList] = useState([]);

  const [inputData, setInputData] = useState({ file_name: "" });
  //const [videodata, setVideodata] = useState({ status: "", final_highlight:"",final_original:"",id:""});
  const [showVideo, setShowVideo] = useState(false);
  //const [SFARN, setSFARN] = useState('arn:aws:states:us-east-1:456667773660:execution:soccer_highlights_march_23_V3:471fadfc-7ad1-4124-b60c-47d9a3c0313b');
  const [SFARN, setSFARN] = useState('start');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [executionStatus, setExecutionStatus] = useState(null);
  const [vidhigh, setVidhigh] = useState(null);
  const [vidorig, setVidorig] = useState(null);
  const API_post="https://qnnyj5ljke.execute-api.us-east-1.amazonaws.com/dev/SoccerStartSF-dev"
  const API_GET="https://qnnyj5ljke.execute-api.us-east-1.amazonaws.com/dev/SoccerStartSF-dev"
  const handleInputChange = (e) => {
    setInputData({ file_name: e.target.value });
  };

  const fetchVideoList = async () => {
    try {
      const response = await Storage.list("");
      const list = response.results;
      console.log("List:", list);
      const videoFiles = list
        .filter((item) => item.key.endsWith(".mp4"))
        .map((item) => item.key);
      setVideoList(videoFiles);
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };
  
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(submitClicked);
    const response = await fetch(API_post, {
    method: 'POST',
    mode: 'cors',
    headers: {
    },
    body: JSON.stringify(inputData),
    }).then(resp => resp.json()) // return a promise that resolves with the parsed JSON data
    .then((data) => {setSFARN(data.executionArn)})
    .catch(error => {
      // handle any errors
      console.error('Error fetching data:', error);
    });
    //console.log(data.executionArn);

    //await new Promise(resolve => setTimeout(resolve, 10000));  


    console.log("response2:",response)
    // Poll the execution status until it is either SUCCEEDED or FAILED
    console.log("SFARN:",SFARN)
    setSubmitClicked(true);

  };


  useEffect(() => {
    async function fetchImage() {
      try {
        const signedUrl = await Storage.get("soccer_med_ball.jpg");
        setImageUrl(signedUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
    fetchVideoList();
    fetchImage();
  },  []);

useEffect(() => {
  let status='';
  console.log("submitClicked useeffect",submitClicked) ;
  console.log("SFARN useeffect:",SFARN);
  console.log("executionStatus useeffect:",executionStatus);
  console.log("showVideo useeffect:",showVideo)
  
  const interval = setInterval(async () => {
    const executionResponse = await API.graphql(graphqlOperation(`
      query MyQuery {
        getSFworkflow(id: "${SFARN}") {
          id
          final_highlight
          final_original
          status
        }
      }
    `));

    console.log(executionResponse.data.getSFworkflow);
    const status = executionResponse.data.getSFworkflow.status;
    setExecutionStatus(status);

    if (status === 'Succeeded') {
      clearInterval(interval);
      setShowVideo(true);
      setVidhigh(executionResponse.data.getSFworkflow.final_highlight)
      setVidorig(executionResponse.data.getSFworkflow.final_original)
      
    }
  }, 10000); // wait for 5 seconds before making the next API call

  return () => clearInterval(interval);
}, [SFARN]);


 

return (
<Container maxWidth="md" sx={{ paddingTop: (theme) => theme.spacing(4) }}>
    <Typography variant="h4" align="center" gutterBottom>
      Soccer Match Highlight Generator
    </Typography>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
      <img
        src={imageUrl}
        alt="Your Image Description"
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
    />
      </Grid>
    </Grid>
    <form sx={{ marginTop: (theme) => theme.spacing(2) }} onSubmit={handleFormSubmit}>
    <FormControl fullWidth variant="outlined">
  <InputLabel htmlFor="file-name">File Name</InputLabel>
  <Select
    labelId="file-name-label"
    id="file-name"
    value={inputData.file_name}
    onChange={handleInputChange}
    label="File Name"
  >
    {videoList.map((videoFile) => (
      <MenuItem key={videoFile} value={videoFile}>
        {videoFile}
      </MenuItem>
    ))}
  </Select>
</FormControl>
     <Button
  type="submit"
  fullWidth
  variant="contained"
  color="primary"
  sx={{ marginTop: (theme) => theme.spacing(2) }}
>
        Submit
      </Button>
    </form>
    <Box mt={2}>
      {SFARN && (
        <Typography>Execution ARN: {SFARN}</Typography>
      )}
      {executionStatus && (
        <Typography>Execution status: {executionStatus}</Typography>
      )}
    </Box>
    <Box mt={4}>
      {showVideo ? (
        <>
          <Typography variant="h6">Generated Highlights</Typography>
          <video src={vidhigh} controls style={{ width: "100%" }} />
        </>
      ) : (
        <Typography>Waiting for process to finish...</Typography>
      )}
    </Box>
    <Box mt={4}>
      {showVideo ? (
        <>
          <Typography variant="h6">Original Video</Typography>
          <video src={vidorig} controls style={{ width: "100%" }} />
        </>
      ) : (
        <Typography>Waiting for process to finish...</Typography>
      )}
    </Box>
  </Container>
);
}
//export default App;
export default withAuthenticator(App);
