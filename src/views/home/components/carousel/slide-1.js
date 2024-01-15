import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Routes from "../../../routes/routes";

const imageUrl = "https://aws-s3-images.sertnation.com/misc/home-2.jpg";
const imageUrlSm = "https://aws-s3-images.sertnation.com/misc/home-1-mob.jpg";

const HomeCarouselSlide1 = (props) => {
	const history = useHistory();
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	const color = isSm ? "#000000DE" : "#FFF";
	const btnColor = isSm ? "#000000DE" : "#FFF";
	const btnTextColor = !isSm ? "#000000DE" : "#FFF";

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
			>
				<Box
					pl={{ xs: 2, md: 15, xl: 100, lg: 30 }}
					pt={{ xs: 2, md: 0 }}
					width={{ sm: "auto", md: 600 }}
					color={color}
				>
					<Typography variant="h3" color="inherit">
						Make a statement with your clothing
					</Typography>
					<Box pt={2} />
					<Typography variant="body1">
						Presenting modern T-Shirt Designs, which are Designed with thought, tailored with care,
						and delivered with love.
					</Typography>
					<Box pt={2} />
					<Button
						variant="contained"
						disableElevation
						style={{ backgroundColor: btnColor }}
						onClick={() => history.push(Routes.shop.path)}
					>
						<Box display="flex" alignItems="center" py={{ xs: 0.5, md: 1 }}>
							<Typography variant="button" style={{ color: btnTextColor }}>
								shop now
							</Typography>
							<Box px={0.5} />
							<ArrowRight htmlColor={btnTextColor} />
						</Box>
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default HomeCarouselSlide1;
