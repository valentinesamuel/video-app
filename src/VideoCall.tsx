import { useEffect, useState } from "react";
import {
  channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "./settings";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { Grid } from "@mui/material";
import Controls from "./Controls";
import Video from "./Video";

export default function VideoCall({
  setInCall,
}: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name: string) => {
      console.log("init", name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("✅✅✅published", user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack!.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        console.log("⛔⛔⛔unpublished", user, mediaType);
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("🚀🚀🚀leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
        console.log("🥰🥰🥰🥰user joined");
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, tracks]);

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item style={{ height: "5%" }}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </Grid>
      <Grid item style={{ height: "95%" }}>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </Grid>
    </Grid>
  );
}
