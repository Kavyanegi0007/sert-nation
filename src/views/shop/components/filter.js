import {
	Box,
	Checkbox,
	FormControlLabel,
	Typography,
	useMediaQuery,
	Paper,
	Container,
	IconButton,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { ProductContext } from "../../../store/product";
import ProductAction from "../../../store/product/action";

const ShopViewFilterCmp = (props) => {
	const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const [show, setShow] = useState(false);

	return (
		<>
			{isSm && (
				<Box position="fixed" top={48} zIndex={100}>
					<Paper
						elevation={3}
						style={{
							height: 48,
							width: "100vw",
							borderRadius: 0,
							backgroundColor: "white",
						}}
					>
						<Box display="flex" alignItems="center" height="100%">
							<IconButton onClick={() => setShow(!show)}>
								<FilterList />
							</IconButton>
							<Typography>
								<strong>Filters</strong>
							</Typography>
						</Box>
					</Paper>
				</Box>
			)}
			{show && (
				<Box
					height="100%"
					width="100vw"
					bgcolor="#000000AA"
					top={0}
					position="absolute"
					onClick={() => setShow(false)}
					zIndex={1}
				/>
			)}
			{(!isSm || show) && (
				<Box
					height="100%"
					flex={1}
					width={{ xs: 250, md: "auto" }}
					pl={{ xs: 2, md: 0 }}
					top={96}
					position={isSm ? "fixed" : "sticky"}
					bgcolor="white"
					zIndex={1}
					overflow="auto"
				>
					<Box display="flex" pt={4} flexDirection="column">
						<Box display="flex">
							<Box borderBottom="2px solid #FF9900">
								<Typography variant="body1" color="textSecondary" component="span">
									FILTERS
								</Typography>
							</Box>
						</Box>
						<Typography variant="caption" color="textSecondary" component="span">
							exclusive collection
						</Typography>
					</Box>
					<Box pt={4} />
					<ProductTypeFilter />
					<Box pt={4} />
					<ColorFilter />
					<Box pt={4} />
					<SleeveFilter />
				</Box>
			)}
		</>
	);
};

const ProductTypeFilter = (props) => {
	const [productS, productR] = useContext(ProductContext);
	const value = productS.filters.type;

	function handleChange(val) {
		productR({ type: ProductAction.updateFilter, payload: { type: val } });
	}

	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="body1" color="textPrimary">
				PRODUCT TYPE
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "all"}
						onChange={() => {
							handleChange("all");
						}}
					/>
				}
				label="All"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "garment"}
						onChange={() => {
							handleChange("garment");
						}}
					/>
				}
				label="Clothes"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "accessory"}
						onChange={() => {
							handleChange("accessory");
						}}
					/>
				}
				label="Accessories"
			/>
		</Box>
	);
};

const ColorFilter = (props) => {
	const [productS, productR] = useContext(ProductContext);
	const value = productS.filters.color;

	function handleChange(val) {
		productR({ type: ProductAction.updateFilter, payload: { color: val } });
	}

	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="body1" color="textPrimary">
				COLOR
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "all"}
						onChange={() => {
							handleChange("all");
						}}
					/>
				}
				label="All"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "white"}
						onChange={() => {
							handleChange("white");
						}}
					/>
				}
				label="White"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "black"}
						onChange={() => {
							handleChange("black");
						}}
					/>
				}
				label="Black"
			/>
		</Box>
	);
};

const SleeveFilter = (props) => {
	const [productS, productR] = useContext(ProductContext);
	const value = productS.filters.length;

	function handleChange(val) {
		productR({ type: ProductAction.updateFilter, payload: { length: val } });
	}

	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="body1" color="textPrimary">
				SLEEVE LENGTH
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "all"}
						onChange={() => {
							handleChange("all");
						}}
					/>
				}
				label="All"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "half"}
						onChange={() => {
							handleChange("half");
						}}
					/>
				}
				label="Half"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={value === "full"}
						onChange={() => {
							handleChange("full");
						}}
					/>
				}
				label="Full"
			/>
		</Box>
	);
};

export default ShopViewFilterCmp;
