import React from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

export const appId = "b8fae4c8df3a4ab998f3910cb392d82f";
export const token = null;
export const channelName = "main";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };

export const useClient = createClient({
  mode: "rtc",
  codec: "vp8",
});
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// const App = () => {
//   const client = useClient();
//   const { ready, tracks } = useMicrophoneAndCameraTracks();

//   return (
//     ready && (
//       <AgoraVideoPlayer
//         videoTrack={tracks[1]}
//         style={{ height: "100%", width: "100%" }}
//       />
//     )
//   );
// };
