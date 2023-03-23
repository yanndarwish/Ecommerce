import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material"
import { shades } from "../theme"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { addToCart, increaseCount } from "../state/productsSlice"
import { useNavigate } from "react-router-dom"

export interface IItem {
	id: number
	name: string
	category: string
	description: string
	price: string
	texture: string
	weight: string
	size: string
	images: string[]
}

export interface IItemProps {
	item: IItem
	width?: string
	margin?: string
}

const Item = (props: IItemProps) => {
	const cart = useAppSelector((state) => state.productsSlice.cart)
	const ref = useRef<HTMLDivElement | null>(null)
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [count, setCount] = useState(1)
	const [isHovered, setIsHovered] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	const handleClick = () => {
		if (props.item) {
			// check if already in cart
			if (cart.some((product) => product.id === props.item.id)) {
				dispatch(increaseCount({ id: props.item.id }))
			} else {
				dispatch(addToCart({ item: { ...props.item, count } }))
			}
		}
	}

	useEffect(() => {
		if (ref.current) {
			const observer = new IntersectionObserver((entries) => {
				const entry = entries[0]
				setIsVisible(entry.isIntersecting)
			})
			observer.observe(ref.current)
		}
	}, [])

	useEffect(() => {
		if (ref.current) {
			if (isVisible) {
				ref.current.classList.add("appearUp")
			} else {
				ref.current.classList.remove("appearUp")
			}
		}
	}, [isVisible])

	return (
		<Box
			ref={ref}
			marginX={props.margin}
			width={props.width}
			padding="8px"
			overflow="hidden"
			sx={{ opacity: "0" }}
		>
			<Box
				position="relative"
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
				overflow="hidden"
			>
				<img
					src={props.item.images[0]}
					alt={props.item.name}
					width="100%"
					height="250px"
					onClick={() => navigate(`/Ecommerce/item/${props.item.id}`)}
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
							onClick={() => handleClick()}
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
					{props.item.category
						.replace(/([A-Z])/g, "$1")
						.replace(/^./, (str) => str.toUpperCase())}
				</Typography>
				<Typography>{props.item.name}</Typography>
				<Typography fontWeight="bold">${props.item.price}</Typography>
			</Box>
		</Box>
	)
}

export default Item
