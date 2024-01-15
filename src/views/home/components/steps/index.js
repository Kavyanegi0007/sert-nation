import { colors, Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";
import HomeStepTileCmp from "./tile";
import { HomeEarning, HomeRefer, HomeShoppingBag } from "../../../../core/constants/image-locator";

const HomeStepsCmp = (props) => {
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const theme = useTheme();

	return (
		<Box bgcolor={colors.grey[200]}>
			<Container style={{ padding: 0 }}>
				<Grid container>
					<Grid item xs={12} md={4}>
						<HomeStepTileCmp
							icon={HomeShoppingBag}
							title="Handpicked Collection"
							content="Purchase any of our products, ranging from our garment collection to instructive videos on fashion and personality development, and many  more."
							index={1}
							color={isSm ? theme.palette.primary.main : "#FFF"}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<HomeStepTileCmp
							icon={HomeRefer}
							title="Refer to Your Friends"
							content="If you like our products, and trust us you will, refer any of our products to your friends using your unique referral code, and get rewards for your referrals."
							index={2}
							color={"transparent"}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<HomeStepTileCmp
							icon={HomeEarning}
							title="Start Earning"
							content="Earn a commission for every time someone uses your refer code, directly into your bank account. Start making a side income simply by referring our products to your friends"
							index={3}
							color={!isSm ? theme.palette.primary.main : "#FFF"}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default HomeStepsCmp;
