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
import { products } from "../../data/data"
import { useParams } from "react-router-dom"

const ShoppingList = () => {
	let { category } = useParams()
	const [value, setValue] = useState("all")
	const isNonMobile = useMediaQuery("(min-width: 600px)")

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue)
	}

	const technology = products.filter((item) => item.category === "tech")
	const skincare = products.filter((item) => item.category === "skincare")
	const home = products.filter((item) => item.category === "home")

	useEffect(() => {
		if (category) {
			setValue(category)
		}
	}, [category])
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
				<Tab label="SKINCARE" value="skincare" />
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
					products.map((item) => (
						<Item key={`${item.name}-${item.id}`} item={item} />
					))}
				{value === "tech" &&
					technology.map((item) => (
						<Item key={`${item.name}-${item.id}`} item={item} />
					))}
				{value === "home" &&
					home.map((item) => (
						<Item key={`${item.name}-${item.id}`} item={item} />
					))}
				{value === "skincare" &&
					skincare.map((item) => (
						<Item key={`${item.name}-${item.id}`} item={item} />
					))}
			</Box>
		</Box>
	)
}

export default ShoppingList
