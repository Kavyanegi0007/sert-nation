import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Box,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import { ReactVideo } from "reactjs-media";

const ViewVideo = ({ open, handleClose, video }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle id="simple-dialog-title">Watch Video</DialogTitle>
			<DialogContent>
				<DialogContentText>{video.title}</DialogContentText>
				<ReactVideo src={video.url} poster={video.thumbnail} primaryColor="#FF9900" />
			</DialogContent>
		</Dialog>
	);
};

export default ViewVideo;
