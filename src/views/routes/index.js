import { Route, Switch } from "react-router-dom";
import AffiliateView from "../affiliate";
import CartView from "../cart";
import HomeView from "../home";
import LoginView from "../auth-views/login";
import ShopViewProvider from "../shop";
import Routes from "./routes";
import ProtectedRoute from "./protected-route";
import VerifyView from "../auth-views/verify";
import OrderPlacedView from "../order-placed";
import { useContext, useEffect } from "react";
import { SocketContext } from "../socket";
import { AuthContext } from "../../store/auth";
import VideoViewProvider from "../video";
import ReferralViewProvider from "../referral";
import TransferViewProvider from "../transfers";
import ReferralLinkRedirect from "../redirects/referral-link-redirect";
import AboutUsView from "../info/about-us-view";
import PrivacyPolicyView from "../info/privacy-policy-view";
import TermsAndConditionsView from "../info/terms-and-condition-view";
import RefundPolicyView from "../info/refund-policy-view";
import OrderViewProvider from "../order";
import ReactGA from "react-ga";

const MyRouter = () => {
  const socket = useContext(SocketContext);
  const [authS] = useContext(AuthContext);

  useEffect(() => {
    socket.init(authS.user?._id);
  }, [authS.user, socket]);

  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <Switch>
      <Route exact path={Routes.login.path} component={LoginView} />
      <Route exact path={Routes.verify.path} component={VerifyView} />
      <Route exact path={Routes.home.path} component={HomeView} />
      <Route exact path={Routes.shop.path} component={ShopViewProvider} />
      <Route exact path={Routes.affiliate.path} component={AffiliateView} />
      <Route
        exact
        path={Routes.referralLink.path}
        component={ReferralLinkRedirect}
      />
      <Route exact path={Routes.aboutUs.path} component={AboutUsView} />
      <Route
        exact
        path={Routes.privacyPolicy.path}
        component={PrivacyPolicyView}
      />
      <Route
        exact
        path={Routes.terms.path}
        component={TermsAndConditionsView}
      />
      <Route exact path={Routes.refund.path} component={RefundPolicyView} />
      <ProtectedRoute exact path={Routes.cart.path} component={CartView} />
      <ProtectedRoute
        exact
        path={Routes.orderPlaced.path}
        component={OrderPlacedView}
      />
      <ProtectedRoute
        exact
        path={Routes.video.path}
        component={VideoViewProvider}
      />
      <Route
        exact
        path={Routes.referral.path}
        component={ReferralViewProvider}
      />
      {/* <ProtectedRoute
        exact
        path={Routes.referral.path}
        component={ReferralViewProvider}
      /> */}
      <Route
        exact
        path={Routes.transfer.path}
        component={TransferViewProvider}
      />
      <ProtectedRoute
        exact
        path={Routes.order.path}
        component={OrderViewProvider}
      />
    </Switch>
  );
};

export default MyRouter;
