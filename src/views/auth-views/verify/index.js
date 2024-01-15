import { Button } from "@material-ui/core";
import { Container, useMediaQuery } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box, useTheme, Paper, TextField, Divider, CircularProgress } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LogoBlack } from "../../../core/constants/image-locator";
import { formatSearchToObject } from "../../../core/utils/formatter";
import { AuthContext } from "../../../store/auth";
import AuthAction from "../../../store/auth/action";

const VerifyView = (props) => {
	const location = useLocation();
	const history = useHistory();
	const theme = useTheme();
	const [authS, authR] = useContext(AuthContext);
	const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const [otp, setOtp] = useState("");

	const email = formatSearchToObject(location.search).email;
	const previousRoute = formatSearchToObject(location.search).from;

	function handleSubmit() {
		if (otp.length !== 0)
			authR({
				type: AuthAction.verify,
				payload: {
					data: { otp, email },
					callback: () => history.replace({ pathname: previousRoute }),
				},
			});
	}

	function handleResendOtp() {
		authR({
			type: AuthAction.resendOtp,
			payload: {
				data: { email },
			},
		});
	}

	return (
		<Box minHeight="100vh" bgcolor={theme.palette.primary.main}>
			<Container style={{ padding: 0 }}>
				<Box className={isXs ? "" : "center"}>
					<Paper elevation={4}>
						<Box p={8}>
							<Box display="flex" flexDirection="column" alignItems="center">
								<Box height={20}>
									<img src={LogoBlack} alt="" />
								</Box>
								<Typography variant="caption">
									<Box fontFamily="Aldrich">Fashion for Everyone</Box>
								</Typography>
								<Box pt={4} />
								<Typography variant="body1">
									<strong>Verify your email.</strong>
								</Typography>
								<Box pt={2} />
								<Typography variant="body2">Please enter OTP sent on:</Typography>
								<Typography variant="body2">
									<strong>{email}</strong>
								</Typography>
								<Box pt={2} />
								<TextField
									id="otp"
									label="Otp"
									variant="outlined"
									size="small"
									fullWidth
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
								<Box pt={2} />
								<Button
									variant="contained"
									color="primary"
									fullWidth
									disableElevation
									disabled={authS.verify.loading}
									onClick={handleSubmit}
								>
									{authS.verify.loading ? (
										<CircularProgress style={{ height: 24, width: 24 }} />
									) : (
										"verify"
									)}
								</Button>
								<Box pt={2} />
								<Button color="default" onClick={handleResendOtp}>
									<Typography variant="body2" color="textSecondary">
										<Box fontWeight={700} style={{ textTransform: "capitalize" }}>
											{authS.resend.loading ? (
												<CircularProgress style={{ height: 24, width: 24 }} />
											) : (
												"resend"
											)}
										</Box>
									</Typography>
								</Button>
								{authS.resend.error && (
									<>
										<Box pt={2} />
										<Typography variant="body1" color="error">
											<strong>{authS.verify.error}</strong>
										</Typography>
									</>
								)}
								{authS.verify.error && (
									<>
										<Box pt={2} />
										<Typography variant="body1" color="error">
											<strong>{authS.verify.error}</strong>
										</Typography>
									</>
								)}
								<Box py={4} width="100%">
									<Divider />
								</Box>
								<Button color="primary">
									<Typography variant="body1">
										<Box fontWeight={700} style={{ textTransform: "capitalize" }}>
											change email
										</Box>
									</Typography>
								</Button>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Container>
		</Box>
	);
};

export default VerifyView;
