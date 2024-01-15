import React from "react";
import {
	Box,
	colors,
	Container,
	Divider,
	Grid,
	Typography,
	useMediaQuery,
} from "@material-ui/core";
import { Mail, Phone, Favorite, Copyright } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Routes from "../../routes/routes";

const AppFooterCmp = (props) => {
	const history = useHistory();
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	return (
		<Box bgcolor="#212121" color="#FFF" py={{ xs: 4, md: 8 }} px={{ xs: 2, md: 0 }}>
			<Container style={{ padding: 0 }}>
				<Grid container>
					{!isSm && (
						<Grid item xs={12} md={2}>
							<Box display="flex" alignItems="center" height="100%">
								<Typography variant="h4">HUSTLE .</Typography>
							</Box>
						</Grid>
					)}
					<Grid item xs={12} md={10}>
						<Box display="flex" flexDirection="column">
							<Box display="flex">
								<Typography
									style={{ fontFamily: "Aldrich", fontSize: 23 }}
									color="primary"
									component="span"
								>
									SERT
								</Typography>
								<Box pr={0.8} />
								<Typography style={{ fontFamily: "Aldrich", fontSize: 23 }} component="span">
									NATION
								</Typography>
							</Box>
							<Typography style={{ fontFamily: "Aldrich", fontSize: 14 }}>
								<i>Fashion for Everyone</i>
							</Typography>
						</Box>
						<Divider style={{ backgroundColor: colors.grey[800], margin: "32px 0" }} />
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box pr={{ xs: 0, md: 2 }}>
									<Typography variant="body1">
										<strong>DISCLAIMER</strong>
									</Typography>
									<Box pt={1} />
									<Typography variant="body2" style={{ textAlign: "justify" }}>
										Sert Nation does not charge any money from you to become an affiliate with it.
										Whatever amount that you pay to Sert Nation is only for the products that we
										provide you. If you like our products and wish to promote them to other people,
										you can earn commission on promoting these products as our affiliate.
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box pl={{ xs: 0, md: 2 }}>
									<Typography variant="body1">
										<strong>CONTACT US</strong>
									</Typography>
									<Box pt={1} />
									<Box display="flex">
										<Phone color="primary" /> <Box pr={2} />{" "}
										<Typography variant="body2">+91 81786 90005</Typography>
									</Box>
									<Box display="flex" pt={1}>
										<Mail color="primary" /> <Box pr={2} />{" "}
										<Typography variant="body2">info@sertnation.com</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Divider style={{ backgroundColor: colors.grey[800], margin: "32px 0" }} />
						<Box className="cursor-pointer" onClick={() => history.push(Routes.aboutUs.path)}>
							<Typography variant="body2">About us</Typography>
						</Box>
						<Box
							className="cursor-pointer"
							pt={1}
							onClick={() => history.push(Routes.privacyPolicy.path)}
						>
							<Typography variant="body2">Privacy Policy</Typography>
						</Box>
						<Box className="cursor-pointer" pt={1} onClick={() => history.push(Routes.terms.path)}>
							<Typography variant="body2">Terms & Conditions</Typography>
						</Box>
						<Box className="cursor-pointer" pt={1} onClick={() => history.push(Routes.refund.path)}>
							<Typography variant="body2">Refund Policy</Typography>
						</Box>
						<Divider style={{ backgroundColor: colors.grey[800], margin: "32px 0" }} />
						<Box display="flex" justifyContent="center">
							<Typography variant="body2">
								<Box display="flex">
									Made with{" "}
									<Box px={1}>
										<Favorite color="primary" fontSize="small" />
									</Box>{" "}
									by developers.
								</Box>
							</Typography>
						</Box>
						<Divider style={{ backgroundColor: colors.grey[800], margin: "32px 0" }} />
						<Box display="flex">
							<Copyright fontSize="small" />
							<Box pr={1} />
							<Typography variant="body2">
								{new Date().getFullYear()} Vaastraveda Enterprises LLP, All rights reserved.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default AppFooterCmp;
