import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";

const HomeStepTileCmp = ({ icon, title, content, index, color }) => {
	const Svg = icon;

	return (
		<Box
			display="flex"
			position="relative"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height={{ xs: 480, sm: 360, md: 440 }}
			px={8}
			bgcolor={color}
		>
			<Box position="absolute" top={16} right={16}>
				<Typography variant="h5" color="textPrimary">
					{index}
				</Typography>
			</Box>
			<Box height={120}>
				<Svg />
			</Box>
			<Box pt={4} />
			<Typography variant="h5" color="textPrimary" align="center">
				{title}
			</Typography>
			<Typography variant="body1" color="textPrimary" align="center">
				{content}
			</Typography>
		</Box>
	);
};

export default HomeStepTileCmp;
