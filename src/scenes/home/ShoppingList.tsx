import { useEffect, useState } from "react"
import {
	Box,
	Typography,
	useTheme,
	Tab,
	Tabs,
	useMediaQuery,
} from "@mui/material"
import Item from "../../components/Item"
import { useAppSelector } from "../../state/hooks"

export interface IShoppingListProps {}

const ShoppingList = (props: IShoppingListProps) => {
	const [value, setValue] = useState("all")
	const items = useAppSelector((state) => state.productsSlice.items)
	const isNonMobile = useMediaQuery("(min-width: 600px)")

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue)
	}

	const technology = items.filter(
		(item) =>
			item.category === "smartphones" ||
			item.category === "laptops" ||
			item.category === "lighting"
	)
	const accessories = items.filter(
		(item) =>
			item.category === "womens-watches" ||
			item.category === "mens-watches" ||
			item.category === "womens-bags" ||
			item.category === "womens-jewellery" ||
			item.category === "sunglasses" ||
			item.category === "fragrances" ||
			item.category === "skincare"
	)
	const home = items.filter(
		(item) =>
			item.category === "home-decoration" ||
			item.category === "furniture" ||
			item.category === "womens-shoes" ||
			item.category === "mens-shirts" ||
			item.category === "mens-shoes"
	)

	return (
		<Box width="80%" margin="80px auto">
			<Typography variant="h3" textAlign="center">
				Our Featured <b>Products</b>
			</Typography>
			<Tabs
				textColor="primary"
				indicatorColor="primary"
				value={value}
				onChange={handleChange}
				centered
				TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
				sx={{
					m: "25px",
					"& .MuiTabs-flexContainer": {
						flexWrap: "wrap",
					},
				}}
			>
				<Tab label="ALL" value="all" />
				<Tab label="HOME" value="home" />
				<Tab label="TECH" value="tech" />
				<Tab label="ACCESSORIES" value="accessories" />
			</Tabs>
			<Box
				margin="0 auto"
				display="grid"
				gridTemplateColumns="repeat(auto-fill, 300px)"
				justifyContent="space-around"
				rowGap="20px"
				columnGap="1.33%"
			>
				{value === "all" &&
					items.map((item) => (
						<Item key={`${item.title}-${item.id}`} item={item} />
					))}
				{value === "tech" &&
					technology.map((item) => (
						<Item key={`${item.title}-${item.id}`} item={item} />
					))}
				{value === "home" &&
					home.map((item) => (
						<Item key={`${item.title}-${item.id}`} item={item} />
					))}
				{value === "accessories" &&
					accessories.map((item) => (
						<Item key={`${item.title}-${item.id}`} item={item} />
					))}
			</Box>
		</Box>
	)
}

export default ShoppingList
