import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-react";

export default function Video({
  users,
  tracks,
}: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) {
  const [gridSpacing, setGridSpacing] = useState(12);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
    if (localVideoRef.current && tracks[1]) {
      const mediaStreamTrack = tracks[1].getMediaStreamTrack();
      const mediaStream = new MediaStream([mediaStreamTrack]);
      localVideoRef.current.srcObject = mediaStream;
    }
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={gridSpacing}>
        <video
          className="vid"
          ref={localVideoRef}
          autoPlay
          playsInline
          style={{ height: "100%", width: "100%" }}
        ></video>
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <video
                  className="vid"
                  ref={user.videoTrack}
                  autoPlay
                  playsInline
                  style={{ height: "100%", width: "100%" }}
                ></video>
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
