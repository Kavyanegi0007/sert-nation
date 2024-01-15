import MyRouter from "./routes";
import AuthStore, { AuthContext } from "../store/auth";
import { useContext, useEffect } from "react";
import AuthAction from "../store/auth/action";
import SocketProvider from "./socket";
import { BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import CheckoutStore, { CheckoutContext } from "../store/checkout";
import CheckoutActions from "../store/checkout/actions";

ReactGA.initialize("UA-187492040-1", {
  titleCase: false,
  gaOptions: {
    // siteSpeedSampleRate: 100,
  },
});

const MyAppProvider = (props) => {
  return (
    <Router>
      <AuthStore>
        <CheckoutStore>
          <SocketProvider>
            <MyApp />
          </SocketProvider>
        </CheckoutStore>
      </AuthStore>
    </Router>
  );
};

const MyApp = (props) => {
  const [, authR] = useContext(AuthContext);
  const [, checkoutR] = useContext(CheckoutContext);

  useEffect(() => {
    authR({ type: AuthAction.authenticate });
    checkoutR({ type: CheckoutActions.syncCart });
  }, []);

  return <MyRouter />;
};

export default MyAppProvider;
