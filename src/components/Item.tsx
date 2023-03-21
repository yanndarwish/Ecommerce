import { useState } from "react"
import { useAppDispatch } from "../state/hooks"
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material"
import { shades } from "../theme"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { addToCart } from "../state/productsSlice"
import { useNavigate } from "react-router-dom"
import { Item } from "../state/productsSlice"
import watch from "../assets/images/watch.png"
import phone from "../assets/images/iphone.png"
import chair from "../assets/images/chair.png"
import cap from "../assets/images/cap.png"

export interface IItemProps {
	item: Item
	width?: string
}

const Item = (props: IItemProps) => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [count, setCount] = useState(1)
	const [isHovered, setIsHovered] = useState(false)
	// custom picture because bad quality on the default ones
	const item = {
		...props.item,
		thumbnail:
			props.item.category === "smartphones" ||
			props.item.category === "laptops" ||
			props.item.category === "lighting"
				? phone
				: props.item.category === "home-decoration" ||
				  props.item.category === "furniture" ||
				  props.item.category === "womens-shoes" ||
				  props.item.category === "mens-shirts" ||
				  props.item.category === "mens-shoes"
				? chair
				: props.item.category === "womens-watches" ||
				  props.item.category === "mens-watches" ||
				  props.item.category === "womens-bags" ||
				  props.item.category === "womens-jewellery" ||
				  props.item.category === "sunglasses" ||
				  props.item.category === "fragrances" ||
				  props.item.category === "skincare"
				? watch
				: cap,
	}
	const { category, price, title } = props.item

	return (
		<Box width={props.width} padding="8px" overflow="hidden">
			<Box
				position="relative"
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
				overflow="hidden"
			>
				<img
					src={item.thumbnail}
					alt={title}
					width="100%"
					height="250px"
					onClick={() => navigate(`/item/${props.item.id}`)}
					style={{
						cursor: "pointer",
						objectFit: "cover",
						objectPosition: "center",
					}}
				/>
				<Box
					display={isHovered ? "block" : "none"}
					position="absolute"
					bottom="10%"
					left="0"
					width="100%"
					padding="0 5%"
				>
					<Box display="flex" justifyContent="space-between">
						{/* ITEM QUANTITY */}
						<Box
							display="flex"
							alignItems="center"
							borderRadius="3px"
							sx={{
								backgroundColor:
									theme.palette.mode === "dark"
										? colors.secondary[800]
										: colors.secondary[200],
							}}
						>
							<IconButton
								onClick={() => setCount(Math.max(count - 1, 1))}
								sx={{
									color: "white",
								}}
							>
								<RemoveIcon />
							</IconButton>
							<Typography color="white">{count}</Typography>
							<IconButton
								onClick={() => setCount(count + 1)}
								sx={{
									color: "white",
								}}
							>
								<AddIcon />
							</IconButton>
						</Box>
						{/* BUTTON  */}
						<Button
							onClick={() =>
								dispatch(addToCart({ item: { ...item, count } }))
							}
							sx={{
								fontWeight: "600",
								color: "white",
								backgroundColor:
									theme.palette.mode === "dark"
										? colors.secondary[800]
										: colors.secondary[200],
								"&:hover": {
									backgroundColor: colors.secondary[500],
								},
							}}
						>
							Add to Cart
						</Button>
					</Box>
				</Box>
			</Box>

			<Box mt="3px">
				<Typography variant="subtitle2" color={colors.primary[600]}>
					{category
						.replace(/([A-Z])/g, "$1")
						.replace(/^./, (str) => str.toUpperCase())}
				</Typography>
				<Typography>{title}</Typography>
				<Typography fontWeight="bold">${price}</Typography>
			</Box>
		</Box>
	)
}

export default Item
