import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import NavBarCmp from "../components/nav-bar";
import ShopViewFilterCmp from "./components/filter";
import ShopViewProductCard from "./components/product-card";
import AppFooterCmp from "../components/footer";
import ProductStore, { ProductContext } from "../../store/product";
import ProductAction from "../../store/product/action";
import Loader1Cmp from "../components/misc/loader-1";
import ErrorRetryCmp from "../components/misc/error-retry";
import ProductDetailDialog from "./components/product-detail-dialog";

const ShopViewProvider = (props) => {
  return (
    <ProductStore>
      <ShopView />
    </ProductStore>
  );
};

const ShopView = (props) => {
  const [productS, productR] = useContext(ProductContext);
  const [selProduct, setSelProduct] = useState();

  const loadPage = useCallback(() => {
    productR({ type: ProductAction.fetchProducts, payload: productS.filters });
  }, []);

  useEffect(() => {
    loadPage();
  }, [productR, loadPage]);

  function handleOpenDialog(data) {
    setSelProduct(data);
  }

  function handleCloseDialog() {
    setSelProduct(undefined);
  }

  function renderBody() {
    if (productS.loading) return <Loader1Cmp />;
    if (productS.hasError) return <ErrorRetryCmp onClick={loadPage} />;

    return (
      <Grid container>
        {productS.products.map((item) => (
          <ShopViewProductCard data={item} onClick={handleOpenDialog} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <NavBarCmp />
      <Box position="relative" minHeight="calc(100vh - 48px)">
        <Container style={{ padding: 0 }}>
          <Box display="flex" position="relative" pt={{ xs: 6, md: 0 }}>
            {/* <ShopViewFilterCmp /> */}
            <Box flex={4}>{renderBody()}</Box>
          </Box>
        </Container>
      </Box>
      <AppFooterCmp />
      {selProduct && (
        <ProductDetailDialog
          open={selProduct !== undefined}
          handleClose={handleCloseDialog}
          item={selProduct}
        />
      )}
    </>
  );
};

export default ShopViewProvider;
