import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Routes from "../../../routes/routes";

const imageUrl = "https://aws-s3-images.sertnation.com/misc/home-3.jpg";

const HomeCarouselSlide2 = (props) => {
	const history = useHistory();
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	return (
		<Box position="relative" height="100%" width="100vw">
			<img src={imageUrl} alt="" />
			<Box
				position="absolute"
				height="100%"
				width="100vw"
				top={0}
				display="flex"
				flexDirection="column"
				justifyContent={isSm ? "" : "center"}
			>
				<Box
					pl={{ xs: 2, md: 15, xl: 100, lg: 30 }}
					pt={{ xs: 2, md: 0 }}
					width={{ sm: "auto", md: 600 }}
					color="#FFF"
				>
					<Typography variant="h3" color="inherit">
						India's biggest fashion affiliate platform
					</Typography>
					<Box pt={2} />
					<Typography variant="body1">
						Start earning by referring to your friends and get commissions upto 80%.
					</Typography>
					<Box pt={2} />
					<Button
						variant="contained"
						disableElevation
						style={{ backgroundColor: "#FFF" }}
						onClick={() => history.push(Routes.affiliate.path)}
					>
						<Box display="flex" alignItems="center" py={{ xs: 0.5, md: 1 }}>
							<Typography variant="button" color="textPrimary">
								start earning
							</Typography>
							<Box px={0.5} />
							<ArrowRight color="textPrimary" htmlColor="#000000DE" />
						</Box>
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default HomeCarouselSlide2;
