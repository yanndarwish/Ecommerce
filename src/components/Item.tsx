import { useState } from "react"
import { useAppDispatch } from "../state/hooks"
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material"
import { shades } from "../theme"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { addToCart } from "../state/productsSlice"
import { useNavigate } from "react-router-dom"
import { Item } from "../state/productsSlice"

export interface IItemProps {
	item: Item
	width: string
}

const Item = (props: IItemProps) => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [count, setCount] = useState(1)
	const [isHovered, setIsHovered] = useState(false)

	const { category, price, title, thumbnail } = props.item

	return (
		<Box width={props.width}>
			<Box
				position="relative"
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<img
					src={thumbnail}
					alt={title}
					width="300px"
					height="400px"
					onClick={() => navigate(`/item/${props.item.id}`)}
					style={{ cursor: "pointer" }}
				/>
				<Box
					display={isHovered ? "block" : "none"}
					position="absolute"
					bottom="10%"
					left="0"
					width="100%"
					padding="0 5px"
				>
					<Box display="flex" justifyContent="space-between">
						{/* ITEM QUANTITY */}
						<Box
							display="flex"
							alignItems="center"
							borderRadius="3px"
							sx={{
								background: `linear-gradient(to right bottom, ${colors.secondary[300]}, ${colors.secondary[800]})`,
							}}
						>
							<IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
								<RemoveIcon />
							</IconButton>
							<Typography color={colors.primary[300]}>{count}</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<AddIcon />
							</IconButton>
						</Box>
						{/* BUTTON  */}
						<Button
							onClick={() =>
								dispatch(addToCart({ item: { ...props.item, count } }))
							}
							sx={{
								color: "white",
								background: `linear-gradient(to right bottom, ${colors.secondary[900]}, ${colors.secondary[700]})`,
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
