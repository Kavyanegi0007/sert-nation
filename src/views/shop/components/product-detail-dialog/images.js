import { Box, colors, IconButton } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";

const ProductDialogImagesCmp = ({ images }) => {
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [swipe, setSwipe] = useState({
    sX: 0,
    sY: 0,
    eX: 0,
    eY: 0,
  });

  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current.getBoundingClientRect().width);
    const interval = setInterval(setNextImage, 5 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [images, setNextImage]);

  const noOfImages = images?.length ?? 0;
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
    setIndex((index + 1) % noOfImages);
  }

  function setPrevImage() {
    if (index === 0) {
      setIndex(noOfImages - 1);
    } else {
      setIndex(Math.abs(index - 1) % noOfImages);
    }
  }

  function setSpecificImage(pos) {
    setIndex(pos);
  }

  return (
    <Box px={{ xs: 0, md: 8 }} position="relative">
      <Controls
        index={index}
        length={noOfImages}
        setNext={setNextImage}
        setPrev={setPrevImage}
        setSpecific={setSpecificImage}
        display="flex"
        justifyContent="center"
      />
      <Box
        width="100%"
        ref={elementRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Box width="100%" height={(width * 4) / 3}>
          <img src={images[index].src} alt="" style={{ borderRadius: 4 }} />
        </Box>
      </Box>
    </Box>
  );
};

const Controls = ({ setNext, setPrev, setSpecific, length, index }) => {
  return (
    <>
      <Box
        position="absolute"
        left={16}
        top="50%"
        color={colors.grey[500]}
        border={"1px solid " + colors.grey[500]}
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
        color={colors.grey[500]}
        border={"1px solid " + colors.grey[500]}
        borderRadius={100}
      >
        <IconButton onClick={setNext} color="inherit" size="small">
          <KeyboardArrowRight />
        </IconButton>
      </Box>
      <Box
        position="absolute"
        bottom={-16}
        display="flex"
        justifyContent="center"
        width="100%"
        left={0}
      >
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
          bgcolor={i === index ? colors.grey[900] : colors.grey[500]}
          mx={0.5}
          borderRadius={40}
          onClick={() => {
            setSpecific(i);
          }}
          style={{ cursor: "pointer" }}
        />
      );
    }

    return list;
  }
};

export default ProductDialogImagesCmp;
