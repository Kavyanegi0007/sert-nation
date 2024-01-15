import { Box } from "@material-ui/core";
import React, { useState } from "react";
import HomeCarouselControls from "./controls";
import HomeCarouselSlide1 from "./slide-1";
import HomeCarouselSlide2 from "./slide-2";
import HomeCarouselSlide3 from "./slide-3";
import HomeCarouselSlide4 from "./slide-4";

const NO_OF_SLIDES = 4;
const slides = [
	<HomeCarouselSlide1 />,
	<HomeCarouselSlide2 />,
	<HomeCarouselSlide3 />,
	<HomeCarouselSlide4 />,
];

const HomeCarouselCmp = (props) => {
	const [index, setIndex] = useState(0);
	const [swipe, setSwipe] = useState({
		sX: 0,
		sY: 0,
		eX: 0,
		eY: 0,
	});

	React.useEffect(() => {
		const interval = setInterval(setNextImage, 5 * 1000);
		return () => {
			clearInterval(interval);
		};
	});

	const min_x = 30; //min x swipe for horizontal swipe
	const max_x = 30; //max x difference for vertical swipe
	const min_y = 50; //min y swipe for vertical swipe
	const max_y = 60; //max y difference for horizontal swipe

	function handleTouchStart(e) {
		let t = e.touches[0];
		setSwipe({ ...swipe, sX: t.screenX, sY: t.screenY });
	}

	function handleTouchMove(e) {
		e.preventDefault();
		var t = e.touches[0];
		setSwipe({ ...swipe, eX: t.screenX, eY: t.screenY });
	}

	function handleTouchEnd() {
		//horizontal detection
		if (
			(swipe.eX - min_x > swipe.sX || swipe.eX + min_x < swipe.sX) &&
			swipe.eY < swipe.sY + max_y &&
			swipe.sY > swipe.eY - max_y &&
			swipe.eX > 0
		) {
			// right swipe
			if (swipe.eX > swipe.sX) setPrevImage();
			// left swipe
			else setNextImage();
		}
		//vertical detection
		else if (
			(swipe.eY - min_y > swipe.sY || swipe.eY + min_y < swipe.sY) &&
			swipe.eX < swipe.sX + max_x &&
			swipe.sX > swipe.eX - max_x &&
			swipe.eY > 0
		) {
			// Downward swipe
			if (swipe.eY > swipe.sY) {
			}
			// upward swipe
			else {
			}
		}
		setSwipe({ eX: 0, eY: 0, sX: 0, sY: 0 });
	}

	function setNextImage() {
		setIndex((index + 1) % NO_OF_SLIDES);
	}

	function setPrevImage() {
		if (index === 0) {
			setIndex(NO_OF_SLIDES - 1);
		} else {
			setIndex(Math.abs(index - 1) % NO_OF_SLIDES);
		}
	}

	function setSpecificImage(pos) {
		setIndex(pos);
	}

	return (
		<Box
			position="relative"
			height="calc(100vh - 48px)"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{slides[index]}
			<HomeCarouselControls
				setNext={setNextImage}
				setPrev={setPrevImage}
				setSpecific={setSpecificImage}
				length={NO_OF_SLIDES}
				index={index}
			/>
		</Box>
	);
};

export default HomeCarouselCmp;
