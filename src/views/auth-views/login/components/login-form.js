import { CircularProgress, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LogoBlack } from "../../../../core/constants/image-locator";
import { formatSearchToObject } from "../../../../core/utils/formatter";
import { validateEmail } from "../../../../core/utils/validators";
import { AuthContext } from "../../../../store/auth";
import AuthAction from "../../../../store/auth/action";
import Routes from "../../../routes/routes";

const LoginForm = (props) => {
	const location = useLocation();
	const history = useHistory();
	const [authS, authR] = useContext(AuthContext);
	const [state, setState] = useState({});
	const [error, setError] = useState({});

	const previousRoute = formatSearchToObject(location.search).from;

	function handleInputChange(e) {
		const { name, value } = e.target;

		setState({ ...state, [name]: value });
		setError({
			...error,
			[name]: "",
		});
	}

	function handleSubmit() {
		let error = {};
		if (!state.email?.trim() || !validateEmail(state.email?.trim())) {
			error.email = "Please enter a valid email";
		}
		if (!state.password?.trim()) {
			error.password = "Please enter password";
		}

		setError(error);

		if (Object.keys(error).length === 0) {
			authR({
				type: AuthAction.login,
				payload: {
					data: {
						email: state.email,
						password: state.password,
					},
					onNotVerified: () =>
						history.push({
							pathname: Routes.verify.path,
							search: history.location.search + "&email=" + state.email,
						}),
					callback: () =>
						history.replace({
							pathname: previousRoute,
						}),
				},
			});
		}
	}

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Box height={20}>
				<img src={LogoBlack} alt="" />
			</Box>
			<Typography variant="caption">
				<Box fontFamily="Aldrich">Fashion for Everyone</Box>
			</Typography>
			<Box pt={4} />
			<Typography variant="body1">Welcome Back.</Typography>
			<Box pt={2} />
			<TextField
				label="Email"
				name="email"
				variant="outlined"
				size="small"
				fullWidth
				value={state.email}
				error={error.email}
				helperText={error.email}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				name="password"
				label="Password"
				variant="outlined"
				size="small"
				fullWidth
				type="password"
				value={state.password}
				error={error.password}
				helperText={error.password}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<Button
				variant="contained"
				color="primary"
				fullWidth
				disableElevation
				onClick={handleSubmit}
				disabled={authS.login.loading}
			>
				{authS.login.loading ? <CircularProgress style={{ height: 24, width: 24 }} /> : "log in"}
			</Button>
			{authS.login.error && (
				<>
					<Box pt={2} />
					<Typography variant="body1" color="error">
						<strong>{authS.login.error}</strong>
					</Typography>
				</>
			)}
		</Box>
	);
};

export default LoginForm;
