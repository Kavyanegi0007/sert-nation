import { Box, Typography, TextField, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth";
import { TransferContext } from "../../../store/transfer";
import TransferAction from "../../../store/transfer/action";
import showAlertDialog from "../../components/dialog/alert-dialog";

const TransferDetailsForm = (props) => {
	const [transferS, transferR] = useContext(TransferContext);
	const [authS] = useContext(AuthContext);
	const [state, setState] = useState({
		accountNumber: "",
		ifsc: "",
		accountHolderName: "",
		bankName: "",
	});

	useEffect(() => {
		setState(transferS.transferDetails.data ?? {});
	}, [transferS.transferDetails]);

	function handleInputChange(e) {
		setState({ ...state, [e.target.name]: e.target.value });
	}

	function handleSubmit() {
		if (!state.accountHolderName || !state.accountNumber || !state.bankName || !state.ifsc) {
			showAlertDialog({ content: "Please fill all the details" });
		} else {
			transferR({
				type: TransferAction.updateDetails,
				payload: { data: state, userId: authS.user._id },
			});
		}
	}

	return (
		<Box>
			<Typography variant="h5" color="textPrimary">
				Details
			</Typography>
			<Typography variant="body1" color="textSecondary">
				All transfers will occour in this account.
			</Typography>
			<Box pt={2} />
			<Box display="flex">
				<TextField
					name="accountNumber"
					required
					label="Bank Account Number"
					variant="outlined"
					size="small"
					value={state.accountNumber}
					onChange={handleInputChange}
				/>
				<Box px={1} />
				<TextField
					name="ifsc"
					required
					label="IFSC code"
					variant="outlined"
					size="small"
					value={state.ifsc}
					onChange={handleInputChange}
				/>
			</Box>
			<Box pt={2} />
			<Box display="flex">
				<TextField
					name="accountHolderName"
					required
					label="Account Holder Name"
					variant="outlined"
					size="small"
					value={state.accountHolderName}
					onChange={handleInputChange}
				/>
				<Box px={1} />
				<TextField
					name="bankName"
					required
					label="Bank Name"
					variant="outlined"
					size="small"
					value={state.bankName}
					onChange={handleInputChange}
				/>
			</Box>
			<Box pt={2} />
			<Button variant="contained" color="primary" disableElevation onClick={handleSubmit}>
				<strong>update</strong>
			</Button>
		</Box>
	);
};

export default TransferDetailsForm;
