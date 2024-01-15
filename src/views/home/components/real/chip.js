import React from "react";
import { Box, colors, Typography, useTheme } from "@material-ui/core";

const HomeRealChipCmp = ({ icon, title }) => {
	const Icon = icon;
	const theme = useTheme();

	return (
		<Box display="flex" justifyContent="center" py={8}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				bgcolor={colors.grey[200]}
				height={280}
				width={280}
				borderRadius={200}
				boxShadow={theme.shadows[5]}
			>
				<Box height={80} pb={2}>
					<Icon />
				</Box>
				<Typography variant="h6">{title}</Typography>
			</Box>
		</Box>
	);
};

export default HomeRealChipCmp;
