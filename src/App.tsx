import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoCall from "./VideoCall";
import Button from "@mui/material/Button/Button";


function App() {
 
   const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
}

export default App;
