import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

const VideoViewTile = ({ item, handleOpen }) => {
	return (
		<Box pb={4}>
			<Typography variant="h4" color="textPrimary">
				{item.title}
			</Typography>
			<Typography variant="bddy1" color="textSecondary">
				{item.description}
			</Typography>
			<Box pt={2}>
				<Grid container spacing={4}>
					{item.videos.map((item) => (
						<Item item={item} onClick={handleOpen} />
					))}
				</Grid>
			</Box>
		</Box>
	);
};

const Item = ({ item, onClick }) => {
	const [width, setWidth] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		setWidth(ref.current.getBoundingClientRect().width);
	}, []);

	return (
		<Grid item xs={12} md={4} ref={ref}>
			<Box className="cursor-pointer" onClick={() => onClick(item)}>
				<Box width="100%">
					<img src={item.thumbnail} alt={item.title} />
				</Box>
				<Typography variant="h6">
					<Box fontWeight={400} fontFamily="Work Sans">
						{item.title}
					</Box>
				</Typography>
			</Box>
		</Grid>
	);
};

export default VideoViewTile;
