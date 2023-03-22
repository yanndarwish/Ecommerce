import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import {
	IconButton,
	Box,
	Typography,
	useTheme,
	Button,
	Tabs,
	Tab,
} from "@mui/material"
import { FavoriteBorderOutlined } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../../theme"
import { addToCart, increaseCount } from "../../state/productsSlice"
import { useParams } from "react-router-dom"
import Item from "../../components/Item"
import { products } from "../../data/data"
import { IItem } from "../../components/Item"

const trending = products.slice(0, 5)

const ItemDetails = () => {
	const dispatch = useAppDispatch()
	const cart = useAppSelector((state) => state.productsSlice.cart)
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const { itemId } = useParams()
	const [item, setItem] = useState<IItem | undefined>(undefined)
	const [value, setValue] = useState("description")
	const [count, setCount] = useState(1)
	const [image, setImage] = useState<string | null>(null)

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue)
	}

	const handleClick = () => {
		if (item) {
			// check if already in cart
			if (cart.some((product) => product.id === item.id)) {
				dispatch(increaseCount({ id: item.id }))
			} else {
				dispatch(addToCart({ item: { ...item, count } }))
			}
		}
	}

	const handleMouseOver = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		setImage((e.target as HTMLImageElement).src)
	}

	useEffect(() => {
		if (itemId) {
			setItem(products.filter((item) => item.id === parseInt(itemId))[0])
			setImage(null)
		}
	}, [itemId])

	return (
		<Box width="80%" m="80px auto">
			<Box display="flex" flexWrap="wrap" columnGap="40px">
				{/* IMAGES */}
				<Box
					flex="1 1 40%"
					mb="40px"
					display="flex"
					flexDirection="column"
					gap="20px"
				>
					<Box>
						<img
							src={image ? image : item?.images[0]}
							alt={item?.name}
							width="100%"
							height="100%"
							style={{ objectFit: "contain" }}
						/>
					</Box>
					<Box
						display="flex"
						width="100%"
						gap="20px"
						justifyContent="space-between"
					>
						{item?.images?.map((image, i) => (
							<Box
								height="100px"
								key={i}
								sx={{
									transition: "100ms",
									"&:hover": {
										boxShadow: "5px 5px 5px rgb(0,0,0, 0.3)",
									},
								}}
							>
								<img
									onMouseOver={(e) => handleMouseOver(e)}
									style={{ height: "100%", width: "100%", objectFit: "cover" }}
									src={image}
									alt={`image-${item.name}-${i}`}
									key={`image-${item.name}-${i}`}
								/>
							</Box>
						))}
					</Box>
				</Box>
				{/* ACTIONS */}
				<Box flex="1 1 50%" mb="40px">
					<Box m="15px 0 25px 0">
						<Typography variant="h3" fontWeight="bold">
							{item?.name}
						</Typography>
						<Typography>${item?.price}</Typography>
						<Typography sx={{ mt: "20px" }}>{item?.description}</Typography>
					</Box>
					<Box display="flex" alignItems="center" minHeight="50px">
						{/* COUNT */}
						<Box
							display="flex"
							alignItems="center"
							border={`1.5px solid ${colors.neutral[300]}`}
							mr="20px"
							p="2px 5px"
						>
							<IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
								<RemoveIcon />
							</IconButton>
							<Typography color={colors.neutral[300]} sx={{ p: "0 5px" }}>
								{count}
							</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<AddIcon />
							</IconButton>
						</Box>
						{/* BUTTON */}
						{item !== undefined && (
							<Button
								onClick={() => handleClick()}
								sx={{
									fontWeight: "600",
									color: "white",
									backgroundColor:
										theme.palette.mode === "dark"
											? colors.secondary[800]
											: colors.secondary[200],
									padding: "10px 40px",
									"&:hover": {
										backgroundColor: colors.secondary[300],
										color: colors.primary[800],
									},
								}}
							>
								Add to Cart
							</Button>
						)}
					</Box>
					<Box>
						<Box m="20px 0 5px 0" display="flex">
							<FavoriteBorderOutlined />
							<Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
						</Box>
						<Typography>CATEGORIES : {item?.category}</Typography>
					</Box>
				</Box>
			</Box>
			{/* INFORMATION */}
			<Box m="20px 0">
				<Tabs value={value} onChange={handleChange}>
					<Tab label="DESCRIPTTION" value={"description"} />
					<Tab label="REVIEWS" value={"reviews"} />
				</Tabs>
			</Box>
			<Box display="flex" flexWrap="wrap" gap="15px">
				{value === "description" && <div>{item?.description}</div>}
				{value === "reviews" && <div>Reviews</div>}
			</Box>
			{/* RELATED ITEMS */}
			<Box mt="50px" width="100%">
				<>
					<Typography variant="h3" fontWeight="bold">
						Related Products
					</Typography>
					<Box
						mt="20px"
						display="flex"
						flexWrap="wrap"
						columnGap="1.33%"
						rowGap="20px"
						justifyContent="space-between"
					>
						{trending?.map((item, i) => (
							<Item key={`${item.name}-${i}`} item={item} width="300px" />
						))}
					</Box>
				</>
			</Box>
		</Box>
	)
}

export default ItemDetails
