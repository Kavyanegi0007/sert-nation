import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import NavBarCmp from "../components/nav-bar";
import AppFooterCmp from "../components/footer";
import VideoViewTile from "./components/tile";
import VideoStore, { VideoContext } from "../../store/video";
import { AuthContext } from "../../store/auth";
import VideoAction from "../../store/video/action";
import ViewVideo from "./components/view-video";
import PurhcaseVideoCmp from "./components/purchase-video";

const VideoViewProvider = (props) => {
  return (
    <VideoStore>
      <VideoView />
    </VideoStore>
  );
};

const VideoView = () => {
  const [videoS, videoR] = useContext(VideoContext);
  const [authS] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selVideo, setVideo] = useState();

  useEffect(() => {
    videoR({
      type: VideoAction.getVideos,
      payload: { userId: authS.user._id },
    });
    const interval = setInterval(() => {
      videoR({
        type: VideoAction.getVideos,
        payload: { userId: authS.user._id },
      });
    }, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, [videoR, authS.user]);

  function renderBody() {
    if (videoS.notPurchased) {
      return <PurhcaseVideoCmp />;
    }

    return videoS.videos.map((item) => (
      <VideoViewTile
        item={item}
        handleOpen={(item) => {
          setVideo(item);
          setOpen(true);
        }}
      />
    ));
  }

  return (
    <>
      <NavBarCmp />
      <Box>
        <Box minHeight="calc(100vh - 80px)" pt={4}>
          {videoS.loading && (
            <Box
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              left={0}
              bgcolor="#FFFFFFBB"
              zIndex={100}
            >
              <Box
                className="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CircularProgress />
                <Typography>Getting your videos...</Typography>
              </Box>
            </Box>
          )}
          <Box display="flex" flexDirection="column">
            {renderBody()}
          </Box>
        </Box>
        <AppFooterCmp />
      </Box>
      {open && (
        <ViewVideo
          open={open}
          handleClose={() => {
            setOpen(false);
            setVideo(undefined);
          }}
          video={selVideo}
        />
      )}
    </>
  );
};

export default VideoViewProvider;
