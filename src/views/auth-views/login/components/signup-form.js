import { Box, TextField, CircularProgress, Button, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LogoBlack } from "../../../../core/constants/image-locator";
import LocalStorageKeys from "../../../../core/constants/local-storage-keys";
import { validateEmail, validatePhone } from "../../../../core/utils/validators";
import { AuthContext } from "../../../../store/auth";
import AuthAction from "../../../../store/auth/action";
import Routes from "../../../routes/routes";

const SignupForm = (props) => {
	const history = useHistory();
	const [authS, authR] = useContext(AuthContext);
	const [state, setState] = useState({});
	const [error, setError] = useState({});

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
		if (!state.name?.trim()) {
			error.name = "Please enter your name";
		}
		if (!state.email?.trim() || !validateEmail(state.email?.trim())) {
			error.email = "Please enter a valid email";
		}
		if (!state.phone?.trim() || !validatePhone(state.phone?.trim())) {
			error.phone = "Please enter 10 digit mobile number";
		}
		if (!state.password?.trim() || state.password?.trim().length < 8) {
			error.password = "Please enter a strong password";
		}
		if (
			!state.confirmPassword?.trim() ||
			state.confirmPassword?.trim() !== state.password?.trim()
		) {
			error.confirmPassword = "Passwords do not match";
		}

		setError(error);

		if (Object.keys(error).length === 0) {
			authR({
				type: AuthAction.signup,
				payload: {
					data: {
						userData: {
							name: state.name,
							email: state.email,
							phone: state.phone,
							password: state.password,
						},
						referralCode: state.referralCode,
					},
					callback: () =>
						history.replace({
							pathname: Routes.verify.path,
							search: history.location.search + "&email=" + state.email,
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
			<Typography variant="body1">Fill the following form to register.</Typography>
			<Box pt={2} />
			<TextField
				id="name"
				name="name"
				label="Name"
				variant="outlined"
				size="small"
				fullWidth
				required
				value={state.name}
				error={error.name}
				helperText={error.name}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				id="email"
				name="email"
				label="Email"
				variant="outlined"
				size="small"
				fullWidth
				required
				value={state.email}
				error={error.email}
				helperText={error.email}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				id="phone"
				name="phone"
				label="Phone"
				variant="outlined"
				size="small"
				fullWidth
				required
				value={state.phone}
				error={error.phone}
				helperText={error.phone}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				id="referralCode"
				name="referralCode"
				label="Referral Code"
				variant="outlined"
				size="small"
				fullWidth
				value={state.referralCode}
				error={error.referralCode}
				helperText={error.referralCode}
				defaultValue={window.localStorage.getItem(LocalStorageKeys.referral)}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				id="password"
				name="password"
				label="Password"
				variant="outlined"
				size="small"
				fullWidth
				required
				type="password"
				value={state.password}
				error={error.password}
				helperText={error.password}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<TextField
				id="confirmPassword"
				name="confirmPassword"
				label="Confirm Password"
				variant="outlined"
				size="small"
				fullWidth
				type="password"
				value={state.confirmPassword}
				error={error.confirmPassword}
				helperText={error.confirmPassword}
				onChange={handleInputChange}
			/>
			<Box pt={2} />
			<Button
				variant="contained"
				color="primary"
				fullWidth
				disableElevation
				onClick={handleSubmit}
				disabled={authS.signup.loading}
			>
				{authS.signup.loading ? <CircularProgress style={{ height: 24, width: 24 }} /> : "register"}
			</Button>
			{authS.signup.error && (
				<>
					<Box pt={2} />
					<Typography variant="body1" color="error">
						<strong>{authS.signup.error}</strong>
					</Typography>
				</>
			)}
		</Box>
	);
};

export default SignupForm;
