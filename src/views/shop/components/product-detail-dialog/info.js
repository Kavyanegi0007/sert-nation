import { Box, Link, Typography } from "@material-ui/core";
import React, { useState } from "react";

const ProductDialogInfo = ({ item }) => {
  const [show, setShow] = useState(false);

  return (
    <Box pt={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="textSecondary">
          Size Chart
        </Typography>
        <Link component="button" onClick={() => setShow(!show)}>
          <strong>{!show ? "Show" : "Hide"}</strong>
        </Link>
      </Box>
      {show && (
        <Box pt={2} px={8}>
          <Box width="100%">
            <img
              src="https://aws-s3-images.sertnation.com/misc/size-chart.jpg"
              alt="size-chart"
              style={{ borderRadius: 4 }}
            />
          </Box>
        </Box>
      )}
      <Box pt={4} pb={2}>
        <Item title="Product Description" content={item.desc} />
      </Box>
    </Box>
  );
};

const Item = ({ title, content }) => {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {content}
      </Typography>
    </Box>
  );
};

export default ProductDialogInfo;
