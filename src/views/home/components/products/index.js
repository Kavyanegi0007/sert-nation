import { Box, colors, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { HomeClothes, HomeVideo } from "../../../../core/constants/image-locator";
import HomeProductCardCmp from "./card";

const HomeProductCmp = (props) => {
	return (
		<Box bgcolor={colors.grey[200]}>
			<Container style={{ padding: 0 }}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					py={8}
				>
					<Typography variant="h3" color="textPrimary">
						What do we offer?
					</Typography>
					<Typography variant="body1" color="textSecondary">
						We have clothes as well as instructive video courses.
					</Typography>
					<Grid container>
						<Grid item xs={12} sm={6}>
							<HomeProductCardCmp
								image={HomeClothes}
								title="Apparel Collection"
								content="Handpicked designs by fashion gurus. Hyper modern designer Unisex T-shirts, with specially selected premium cloth, fabricated and printed in-house to provide the value your are looking for your money. Shirts for men, a whole collection for women, and much more."
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<HomeProductCardCmp
								image={HomeVideo}
								title="Video Courses"
								content="We offer video series on fashion, personality development, personal branding and social media marketing. These essential series will cover topics about how to utilize our products to their fullest and how to grow yourself into a brand and much more."
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default HomeProductCmp;
