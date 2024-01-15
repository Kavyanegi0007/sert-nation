import React from "react";
import { Box, colors, IconButton } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const HomeCarouselControls = ({ setNext, setPrev, setSpecific, length, index }) => {
	return (
		<>
			<Box
				position="absolute"
				left={16}
				top="50%"
				color={colors.grey[50]}
				border={"1px solid " + colors.grey[50]}
				borderRadius={100}
			>
				<IconButton onClick={setPrev} color="inherit" size="small">
					<KeyboardArrowLeft />
				</IconButton>
			</Box>
			<Box
				position="absolute"
				right={16}
				top="50%"
				color={colors.grey[50]}
				border={"1px solid " + colors.grey[50]}
				borderRadius={100}
			>
				<IconButton onClick={setNext} color="inherit" size="small">
					<KeyboardArrowRight />
				</IconButton>
			</Box>
			<Box position="absolute" bottom={10} display="flex" justifyContent="center" width="100%">
				{renderDots()}
			</Box>
		</>
	);

	function renderDots() {
		let list = [];

		for (let i = 0; i < length; ++i) {
			list.push(
				<Box
					width={8}
					height={8}
					bgcolor={i === index ? colors.grey[900] : colors.grey[200]}
					mx={0.5}
					borderRadius={40}
					onClick={() => {
						setSpecific(i);
					}}
					style={{ cursor: "pointer" }}
				/>,
			);
		}

		return list;
	}
};

export default HomeCarouselControls;
