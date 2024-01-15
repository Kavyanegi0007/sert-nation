import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactDOM from "react-dom";
import { Box, ThemeProvider } from "@material-ui/core";
import MyTheme from "../../../core/theme/theme";

function AlertDialog({ title, content, actions, child, onClose }) {
	const [open, setOpen] = useState(true);

	function handleClose() {
		if (onClose) onClose();
		return setOpen(false);
	}

	return (
		<ThemeProvider theme={MyTheme}>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
				<DialogContent>
					{content && (
						<DialogContentText id="alert-dialog-description">{content}</DialogContentText>
					)}
					{child}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						close
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
}

export default function showAlertDialog({ title, content, actions, child, channel, onClose }) {
	const channelID = channel ?? "default-channel";

	let elem = document.getElementById(channelID);
	if (!elem) {
		elem = document.createElement("div");
		elem.setAttribute("id", channelID);
	}
	console.log(elem);

	ReactDOM.unmountComponentAtNode(elem);
	ReactDOM.render(
		<AlertDialog
			actions={actions}
			child={child}
			content={content}
			title={title}
			onClose={onClose}
		/>,
		elem,
	);
}
