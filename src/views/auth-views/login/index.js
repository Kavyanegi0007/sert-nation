import { Button } from "@material-ui/core";
import { Container, useMediaQuery } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box, useTheme, Paper, Divider } from "@material-ui/core";
import { useState } from "react";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";

const LoginView = (props) => {
	const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const theme = useTheme();
	const [page, setPage] = useState(0);

	return (
		<Box minHeight="100vh" bgcolor={theme.palette.primary.main}>
			<Container style={{ padding: 0 }}>
				<Box className={isXs ? "" : "center"}>
					<Paper elevation={4}>
						<Box p={8}>
							{page === 0 ? <LoginForm /> : <SignupForm />}
							<Box py={4}>
								<Divider />
							</Box>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Typography>
									<strong>{page === 0 ? "New User?" : "Existing User?"}</strong>
								</Typography>
								<Button color="primary" onClick={() => setPage((page + 1) % 2)}>
									<Typography variant="body1">
										<Box fontWeight={700} style={{ textTransform: "capitalize" }}>
											click here
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

export default LoginView;
