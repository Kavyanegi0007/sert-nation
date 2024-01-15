import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";
import { Box, Chip, IconButton, Typography } from "@material-ui/core";
import ProductDialogImagesCmp from "./images";
import { formatCurrency } from "../../../../core/utils/formatter";
import ProductDialogSizesCmp from "./sizes";
import ProductDialogInfo from "./info";
import { ArrowBack } from "@material-ui/icons";
import { getDiscount } from "../../../../core/utils/product-util";

export default function ProductDetailDialog({ open, handleClose, item }) {
  const [selVariant, setVariant] = useState();

  useEffect(() => {
    setVariant(item.variants[0]);
  }, [item]);

  if (item && selVariant) {
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box display="flex">
          <IconButton color="inherit" onClick={handleClose}>
            <ArrowBack />
          </IconButton>
          <DialogTitle id="responsive-dialog-title">Add to cart</DialogTitle>
        </Box>
        <DialogContent>
          <ProductDialogImagesCmp images={item.assets.imgs} />
          <Box pt={4} />
          <Typography variant="h6" color="textPrimary">
            {item.name}
          </Typography>
          <Box display="flex" alignItems="center" pt={1}>
            <Typography variant="h4" color="textPrimary">
              {formatCurrency(selVariant.sp)}
            </Typography>
            <Box pr={1} />
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ textDecoration: "line-through" }}
            >
              {formatCurrency(selVariant.mp)}
            </Typography>
            <Box pr={2} />
            <Chip
              label={getDiscount(selVariant) + "% OFF"}
              size="small"
              color="primary"
            />
          </Box>
          <ProductDialogSizesCmp
            variants={item.variants}
            selVariant={selVariant}
            setVariant={setVariant}
          />
          <ProductDialogInfo item={item} />
        </DialogContent>
      </Dialog>
    );
  } else return null;
}
