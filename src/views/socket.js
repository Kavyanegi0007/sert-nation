import { createContext } from "react";
import socketIOClient from "socket.io-client";
import Config from "../core/config";
import showAlertDialog from "./components/dialog/alert-dialog";
import { Box } from "@material-ui/core";
import { OrderPlaced } from "../core/constants/image-locator";
import { useHistory } from "react-router-dom";
import Routes from "./routes/routes";

class SocketClient {
  socket;
  joinedRoom = false;
  history;

  constructor(history) {
    this.history = history;
    console.log(history);
  }

  init(userId) {
    if (!this.socket) {
      this.socket = socketIOClient(Config.endpoint);
      this.socket.on("connect", () => console.log("connect to websocket"));
      this.socket.on("disconnect", () => {
        console.log("socket disconnected");
        this.joinedRoom = false;
      });
      this.socket.on("order-placed", () => this._handleOrderPlaced());
    }

    if (this.socket && !this.joinedRoom && userId) {
      this.socket.emit("join-self-room", { userId });
      console.log("joined room");
      this.joinedRoom = true;
    }

    this.socket.on("subs-activated", () => this._handleSubsActivated());
  }

  _handleOrderPlaced() {
    console.log("heyya");
    showAlertDialog({
      title: "Order Placed",
      content: "Congratulations! your order has been placed successfully.",
      child: (
        <Box position="relative" height={160}>
          <Box height={160} className="center">
            <OrderPlaced />
          </Box>
        </Box>
      ),
      onClose: () => this.history.replace({ pathname: Routes.home.path }),
    });
  }

  _handleSubsActivated() {
    showAlertDialog({
      title: "Subscription Activated",
      content:
        "Congratulations! Subscription has been activated for you. You may now enjoy your video courses.",
      child: (
        <Box position="relative" height={160}>
          <Box height={160} className="center">
            <OrderPlaced />
          </Box>
        </Box>
      ),
      onClose: () => this.history.push({ pathname: Routes.home.path }),
    });
  }
}

const SocketProvider = ({ children }) => {
  const history = useHistory();
  const socketClient = new SocketClient(history);

  return (
    <SocketContext.Provider value={socketClient}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export const SocketContext = createContext();
