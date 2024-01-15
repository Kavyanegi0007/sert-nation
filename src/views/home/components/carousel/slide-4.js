import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import Routes from "../../../routes/routes";
import { useHistory } from "react-router-dom";

const imageUrl = "https://aws-s3-images.sertnation.com/misc/home-1.jpg";
const imageUrlSm = "https://aws-s3-images.sertnation.com/misc/home-4-mob.jpg";

const HomeCarouselSlide4 = (props) => {
	const history = useHistory();
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	return (
		<Box position="relative" height="100%" width="100vw">
			<img src={isSm ? imageUrlSm : imageUrl} alt="" />
			<Box
				position="absolute"
				height="100%"
				width="100vw"
				top={0}
				display="flex"
				flexDirection="column"
				justifyContent={isSm ? "" : "center"}
				alignItems={isSm ? "center" : "flex-end"}
			>
				<Box
					pr={{ xs: 0, md: 30 }}
					pt={{ xs: 2, md: 0 }}
					width={{ xs: "auto", md: 600 }}
					color="#FFF"
					display="flex"
					flexDirection="column"
					alignItems={isSm ? "center" : "flex-end"}
				>
					<Typography variant="h3" color="inherit" align={isSm ? "center" : "right"}>
						Giving back to the community
					</Typography>
					<Box pt={2} />
					<Typography variant="body1" align={isSm ? "center" : "right"}>
						We do not forget people who help us reach where we are right now, that's why we have a
						unique referral programme for our Sert Family.
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
								join now
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

export default HomeCarouselSlide4;
