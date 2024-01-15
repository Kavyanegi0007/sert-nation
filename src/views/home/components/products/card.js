import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";

const HomeProductCardCmp = ({ title, image, content }) => {
	return (
		<Box px={4} pt={4}>
			<Paper elevation={2}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					px={4}
					pb={4}
				>
					<Box
						width={{ xs: 240, sm: 400, md: 320, lg: 480 }}
						height={{ xs: 240, sm: 400, md: 320, lg: 480 }}
					>
						<img src={image} alt="" style={{ objectFit: "contain" }} />
					</Box>
					<Box pt={1} />
					<Typography variant="h5">{title}</Typography>
					<Box pt={1} />
					<Typography variant="body1" align="center">
						{content}
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
};

export default HomeProductCardCmp;
