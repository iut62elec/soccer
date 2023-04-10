// VideoPreview.js
import React, { useState, useEffect } from "react";
import { Container, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Storage } from "aws-amplify";
import { Navbar, Nav } from "react-bootstrap";

function VideoPreview() {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const cloudFrontBaseUrl = "https://d3e35nf3qga3hq.cloudfront.net/";

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

  const handleVideoSelect = (e) => {
    setSelectedVideo(e.target.value);
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      // Remove '/ HighlightClips' from the selectedVideo
      const cleanedVideoName = selectedVideo.replace("HighlightClips/", "").replace("//","/");
      console.log(cleanedVideoName)  
  
      // Update videoUrl with the new cleanedVideoName
      setVideoUrl(`${cloudFrontBaseUrl}${cleanedVideoName}`);
      console.log(`${cloudFrontBaseUrl}${cleanedVideoName}`)  
    }
  }, [selectedVideo]);

  return (
    <Container maxWidth="md" sx={{ paddingTop: (theme) => theme.spacing(4) }}>
      <Typography variant="h4" align="center" gutterBottom>
        Video Preview
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="file-name">Select Video</InputLabel>
        <Select
          labelId="file-name-label"
          id="file-name"
          value={selectedVideo}
          onChange={handleVideoSelect}
          label="Select Video"
        >
          {videoList.map((videoFile) => (
            <MenuItem key={videoFile} value={videoFile}>
              {videoFile}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        {videoUrl && (
          <>
            <Typography variant="h6" mt={4}>Selected Video</Typography>
            <video
              src={videoUrl}
              controls
              style={{ width: "100%" }}
            ></video>
          </>
        )}
      </div>
    </Container>
  );
}

export default VideoPreview;
