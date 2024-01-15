import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { HomeHigh, HomeQuality, HomeReturns } from "../../../../core/constants/image-locator";
import HomeRealChipCmp from "./chip";

const HomeRealCmp = (props) => {
	return (
		<Box>
			<Container style={{ padding: 0 }}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					py={8}
				>
					<Typography variant="h3" color="textPrimary">
						Our 3 pillars
					</Typography>
					<Typography variant="body1" color="textSecondary">
						We here at Sert Nation strongly believe in
					</Typography>
					<Grid container>
						<Grid item xs={12} sm={4}>
							<HomeRealChipCmp icon={HomeHigh} title="High Commission" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<HomeRealChipCmp icon={HomeQuality} title="Supreme Quality" />
						</Grid>
						<Grid item xs={12} sm={4}>
							<HomeRealChipCmp icon={HomeReturns} title="Instant Transfers" />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default HomeRealCmp;
