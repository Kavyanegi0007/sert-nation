import { Box, colors, Container, Typography, Link, Button } from "@material-ui/core";
import React, { useState } from "react";
import { LogoBlack } from "../../core/constants/image-locator";

const AboutUsView = (props) => {
	const [showInc, setShowInc] = useState(false);
	const [showGst, setShowGst] = useState(false);

	return (
		<Box>
			<Box py={{ xs: 2, md: 4 }} bgcolor={colors.grey[50]}>
				<Container>
					<Box pb={4}>
						<Box height={24}>
							<img src={LogoBlack} alt="" />
						</Box>
					</Box>
					<Box>
						<Typography variant="h4" color="textPrimary" gutterBottom>
							About Us
						</Typography>
						<Typography variant="body1" color="textPrimary">
							We are a Delhi, India based fashion brand and our aim is to build fashion for
							everyone, to build a community where quality fashion is accessible by everyone through
							collective support. Driven by a sense of giving back to the community, we have a
							unique referral programme, with commissions upto 80%.
							<br />
							<br />
							We provide quality products and a video series to complement our products. The purpose
							behind a video series was to educate our Sert Family about fashion and personal
							development. We aim to build a strong fashion community.
							<br />
							<br />
							We are following the Make In India and Atmanirbhar(self-reliant) Bharat Vision,
							therefore, all our products are manufactured in India, starting from raw materials to
							shipping.
						</Typography>
					</Box>
					<Box pt={8}>
						<Typography variant="h4" color="textPrimary" gutterBottom>
							Contact Us
						</Typography>
						<Typography variant="body1" color="textPrimary">
							Call / Whatsapp : +91 81786 90005 , +91 98990 41866
							<br />
							<br />
							To stay updated with latest updates and offers, join us on:
							<br />
							<br />
							Join our Whatsapp group :{" "}
							<Link
								href="https://chat.whatsapp.com/BRKo5PVXvaj1PU0gHOUuVX"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://chat.whatsapp.com/BRKo5PVXvaj1PU0gHOUuVX
							</Link>
							<br />
							Join our Telegram group :{" "}
							<Link
								href="https://t.me/joinchat/TPhI8QmUiNDbi2LS"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://t.me/joinchat/TPhI8QmUiNDbi2LS
							</Link>
						</Typography>
					</Box>
					<Box pt={8}>
						<Typography variant="h4" color="textPrimary" gutterBottom>
							Legal Documents
						</Typography>
						<Typography variant="body1" color="textPrimary">
							Sert Nation is a brand of Vaastraveda Enterprises LLP, founded in 2020, in Delhi,
							India.
							<br />
							<br />
							Following are the 2 leagal documents for Vaastraveda Enterprises LLP, which is the
							company Sert Nation is a brand of. First one is certificate of incorporation and
							second is GST registration certificate.
						</Typography>
						<Box pt={4} />
						<Button color="primary" variant="outlined" onClick={() => setShowInc(!showInc)}>
							<strong>see certificate of incorporation</strong>
						</Button>
						{showInc && (
							<Box width="100%" border={"1px solid " + colors.grey[700]} mt={2} borderRadius={8}>
								<img
									src="https://aws-s3-images.sertnation.com/misc/incorporation.jpg"
									alt="sert nation gst"
									style={{ borderRadius: 8 }}
								/>
							</Box>
						)}

						<Box pt={1} />
						<Button color="primary" variant="outlined" onClick={() => setShowGst(!showGst)}>
							<strong>see gst certificate</strong>
						</Button>
						{showGst && (
							<Box width="100%" border={"1px solid " + colors.grey[700]} mt={2} borderRadius={8}>
								<img
									src="https://aws-s3-images.sertnation.com/misc/gst.jpg"
									alt="sert nation gst"
									style={{ borderRadius: 8 }}
								/>
							</Box>
						)}
					</Box>
				</Container>
			</Box>
		</Box>
	);
};

export default AboutUsView;
