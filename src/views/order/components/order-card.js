import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import { AuthContext } from "../../../store/auth";
import { OrderContext } from "../../../store/order";
import OrderAction from "../../../store/order/action";

const OrderCard = ({ order }) => {
  const [orderS, orderR] = useContext(OrderContext);
  const [authS] = useContext(AuthContext);

  function canCancel() {
    if (order.orderStatus === "confirmed") {
      return true;
    }
    return false;
  }

  function canRetrun() {
    const orderDate = Date.parse(order.updatedAt);
    const todaysDate = Date.now();

    if (
      order.orderStatus === "delivered" &&
      !order.returnStatus &&
      todaysDate - orderDate < 3 * 24 * 60 * 60 * 1000
    ) {
      return true;
    }
    return false;
  }

  function cancelOrder() {
    orderR({
      type: OrderAction.cancelOrder,
      payload: { userId: authS.user._id, id: order._id },
    });
  }

  function returnOrder() {
    orderR({
      type: OrderAction.returnOrder,
      payload: { userId: authS.user._id, id: order._id },
    });
  }

  return (
    <Box pt={4} position="relative">
      {orderS.loading && (
        <Box
          height="100%"
          width="100%"
          position="absolute"
          top={0}
          left={0}
          bgcolor="#FFFFFF64"
          zIndex={100}
        >
          <Box
            className="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <CircularProgress />
            <Box pt={2} />
            <Typography variant="body1">
              Waiting for confirmation ...
            </Typography>
          </Box>
        </Box>
      )}
      <Paper elevation={4}>
        <Box p={{ xs: 2, md: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Item label="Order Number" value={order.number} start />
            <Item label="Order Status" value={order.orderStatus} />
          </Box>
          <Box display="flex" justifyContent="space-between" pt={1}>
            <Item
              label="Order Date"
              value={new Date(order.createdAt).toLocaleDateString()}
              start
            />
            <Item label="Payment Mode" value={order.payment.mode} />
          </Box>
          <Box pt={2}>
            <Typography variant="body1" color="textPrimary">
              <strong>
                {order.order.length} Item{order.order.length > 1 ? "s" : ""}
              </strong>
            </Typography>
            {order.order.map((item) => (
              <ProductItem item={item} />
            ))}
          </Box>
          <Box pt={2}>
            <Typography variant="body1" color="textPrimary">
              <strong>Bill</strong>
            </Typography>
            <Box pt={1}>
              <BillItem label="Item Total" value={order.bill.itemTotal} />
              <BillItem label="Delivery Fee" value={order.bill.deliveryFee} />
              <BillItem label="Discount" value={-order.bill.discount} />
              <BillItem label="Credits Used" value={-order.bill.credits} />
              <Box py={0.5}>
                <Divider />
              </Box>
              <BillItem label="Total" value={order.bill.total} />
            </Box>
            {canCancel() && (
              <Box pt={1} display="flex" justifyContent="flex-end">
                <Button color="primary" onClick={cancelOrder}>
                  <strong>cancel order</strong>
                </Button>
              </Box>
            )}
            {canRetrun() && (
              <Box pt={1} display="flex" justifyContent="flex-end">
                <Button color="primary" onClick={returnOrder}>
                  <strong>return order</strong>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const Item = ({ label, value, start }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={start ? "flex-start" : "flex-end"}
    >
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        <Box style={{ textTransform: "capitalize" }} fontWeight={600}>
          {value}
        </Box>
      </Typography>
    </Box>
  );
};

const ProductItem = ({ item }) => {
  function getAttrs(attrs) {
    const req = ["Color", "Size"];
    return attrs.filter((item) => req.includes(item.name));
  }

  return (
    <Box display="flex" py={1}>
      <Box height={80} width={80}>
        <img src={item.item.assets.imgs[0].src} alt="" />
      </Box>
      <Box flexGrow={1} px={2}>
        <Typography variant="body1" color="textPrimary">
          {item.item.name}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {formatCurrency(item.sp)}
        </Typography>
        <Box>
          {getAttrs(item.sku.attrs).map((el) => (
            <Box display="flex">
              <Typography variant="body2">{el.name}</Typography>
              <Box pl={1} />
              <Typography variant="body2">{el.value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const BillItem = ({ label, value }) => {
  return (
    <Box display="flex">
      <Box width={200}>
        <Typography variant="body1" color="textPrimary">
          {label}
        </Typography>
      </Box>
      <Typography variant="body1" color="textPrimary">
        {formatCurrency(value)}
      </Typography>
    </Box>
  );
};

export default OrderCard;
