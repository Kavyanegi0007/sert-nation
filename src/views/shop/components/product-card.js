import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { formatCurrency } from "../../../core/utils/formatter";

const ShopViewProductCard = ({ data, onClick }) => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current.getBoundingClientRect().width);
  }, []);

  const selVariant = data.variants[0];
  const image = data.assets.imgs[0].src;

  return (
    <Grid item xs={6} md={3}>
      <Box pr={{ xs: 0, sm: 1 }} pb={4}>
        <Box display="flex" flexDirection="column" ref={elementRef}>
          <Box height={(width * 4) / 3} width={width}>
            <img src={image} alt="" />
          </Box>
          <Box pt={0.5} />
          <Typography variant="body1" color="textPrimary">
            {data.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="textPrimary">
              {formatCurrency(selVariant.sp)}
            </Typography>
            <Box pr={1} />
            <Typography
              variant="body1"
              style={{ textDecoration: "line-through" }}
              color="textSecondary"
            >
              {formatCurrency(selVariant.mp)}
            </Typography>
          </Box>
          <Box pt={0.5} />
          <Button
            variant="contained"
            disableElevation
            color="primary"
            style={{ borderRadius: 0, zIndex: 0 }}
            onClick={() => onClick(data)}
          >
            View
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default ShopViewProductCard;
