import {
	Box,
	Paper,
	TableContainer,
	Table,
	TableBody,
	TableHead,
	TableCell,
	TableRow,
	Container,
	Typography,
	colors,
} from "@material-ui/core";
import React from "react";
import { formatCurrency } from "../../../core/utils/formatter";

const AffiliateTableCmp = (props) => {
	return (
		<Box py={4} bgcolor={colors.grey[200]}>
			<Typography variant="h6">
				<Box textAlign="center">Comparision Table</Box>
			</Typography>
			<Box pt={2} />
			<Container>
				<TableContainer component={Paper} elevation={4}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">
									<strong>SERT X</strong>
								</TableCell>
								<TableCell align="center">
									<strong>SERT Z</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<strong>Commission in %</strong>
								</TableCell>
								<TableCell align="center">35%</TableCell>
								<TableCell align="center">80%</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Commission per Referral</strong>
								</TableCell>
								<TableCell align="center">{formatCurrency(700)}</TableCell>
								<TableCell align="center">{formatCurrency(2000)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Cost</strong>
								</TableCell>
								<TableCell align="center">{formatCurrency(2000)}</TableCell>
								<TableCell align="center">{formatCurrency(2500)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>How to get?</strong>
								</TableCell>
								<TableCell align="center">Buy clothes worth {formatCurrency(2000)}</TableCell>
								<TableCell align="center">Buy video course worth {formatCurrency(2500)}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</Box>
	);
};

export default AffiliateTableCmp;
