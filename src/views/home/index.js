import React from "react";
import { Box } from "@material-ui/core";
import NavBarCmp from "../components/nav-bar";
import HomeCarouselCmp from "./components/carousel";
import HomeUspCmp from "./components/usp-cmp";
import HomeStepsCmp from "./components/steps";
import HomeRealCmp from "./components/real";
import HomeProductCmp from "./components/products";
import AppFooterCmp from "../components/footer";

const HomeView = (props) => {
	return (
		<>
			<NavBarCmp />
			<Box position="relative" style={{ overflowX: "hidden" }}>
				<HomeCarouselCmp />
				<HomeUspCmp />
				<HomeStepsCmp />
				<HomeRealCmp />
				<HomeProductCmp />
				<AppFooterCmp />
			</Box>
		</>
	);
};

export default HomeView;
