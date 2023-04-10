import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./Home";
import VideoPreview from "./VideoPreview";
import { Container, Navbar, Nav } from "react-bootstrap";
import { DataStore } from "@aws-amplify/datastore";
import { Amplify, API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { withAuthenticator, AmplifyS3Image } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Video App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/video_preview">
                  Video Preview
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video_preview" element={<VideoPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
