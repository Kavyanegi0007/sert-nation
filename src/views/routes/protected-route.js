import { Box } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import Routes from "./routes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	const [authS] = useContext(AuthContext);

	if (authS.loading) return <Box>Loading ...</Box>;

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!authS.isLoggedIn)
					return (
						<Redirect
							to={{
								pathname: Routes.login.path,
								search: "?from=" + location.pathname.replace("/", ""),
							}}
						/>
					);
				return <Component {...rest} {...props} />;
			}}
		/>
	);
};

export default ProtectedRoute;
