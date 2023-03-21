import { useState, useEffect } from "react"
import { useAppDispatch } from "../../state/hooks"
import {
	IconButton,
	Box,
	Typography,
	useTheme,
	Button,
	Tabs,
	Tab,
	CircularProgress,
} from "@mui/material"
import {
	FavoriteBorderOutlined,
	FormatUnderlinedSharp,
} from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../../theme"
import { addToCart } from "../../state/productsSlice"
import { useParams } from "react-router-dom"
import Item from "../../components/Item"
import {
	useGetProductQuery,
	useGetRelatedProductsQuery,
} from "../../state/productsApi"
import watch from "../../assets/images/watch.png"
import phone from "../../assets/images/iphone.png"
import chair from "../../assets/images/chair.png"
import cap from "../../assets/images/cap.png"

export interface IItem {
	id: number
	title: string
	description: string
	thumbnail: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	images: string[]
}

const ItemDetails = () => {
	const dispatch = useAppDispatch()
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const { itemId } = useParams()
	const [newItem, setNewItem] = useState<IItem | undefined>(undefined)
	const [value, setValue] = useState("description")
	const [count, setCount] = useState(1)
	const [skip, setSkip] = useState(true)
	const [itemsSkip, setItemsSkip] = useState(true)
	const {
		data: item,
		error: itemError,
		isLoading: itemIsLoading,
	} = useGetProductQuery(itemId, { skip })
	const {
		data: relatedItems,
		error: relatedError,
		isLoading: relatedIsLoading,
	} = useGetRelatedProductsQuery(item?.category, {
		skip: itemsSkip,
	})

	const updateImage = () => {
		// custom picture because bad quality on the default ones
		if (item !== undefined) {
			const newItem = {
				...item,
				thumbnail:
					item?.category === "smartphones" ||
					item?.category === "laptops" ||
					item?.category === "lighting"
						? phone
						: item?.category === "home-decoration" ||
						  item?.category === "furniture" ||
						  item?.category === "womens-shoes" ||
						  item?.category === "mens-shirts" ||
						  item?.category === "mens-shoes"
						? chair
						: item?.category === "womens-watches" ||
						  item?.category === "mens-watches" ||
						  item?.category === "womens-bags" ||
						  item?.category === "womens-jewellery" ||
						  item?.category === "sunglasses" ||
						  item?.category === "fragrances" ||
						  item?.category === "skincare"
						? watch
						: cap,
			}
			setNewItem(newItem)
		}
	}

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue)
	}

	const getItem = () => {
		if (itemId) {
			setSkip(false)
		}
	}

	const getRelatedItems = () => {
		setItemsSkip(false)
	}

	useEffect(() => {
		getItem()
	}, [itemId])

	useEffect(() => {
		if (item !== undefined) {
			getRelatedItems()
			updateImage()
		}
	}, [item])
	return (
		<Box width="80%" m="80px auto">
			{itemIsLoading ? (
				<Box display="flex" justifyContent="center" alignItems="center">
					<CircularProgress
						sx={{
							color:
								theme.palette.mode === "dark"
									? colors.secondary[800]
									: colors.secondary[200],
						}}
					/>
				</Box>
			) : (
				<>
					<Box display="flex" flexWrap="wrap" columnGap="40px">
						{/* IMAGES */}
						<Box flex="1 1 40%" mb="40px">
							<img
								src={newItem?.thumbnail}
								alt={item?.title}
								width="100%"
								height="100%"
								style={{ objectFit: "contain" }}
							/>
						</Box>
						{/* ACTIONS */}
						<Box flex="1 1 50%" mb="40px">
							<Box display="flex" justifyContent="space-between">
								<Box>Home/Item</Box>
								<Box>Prev Next</Box>
							</Box>
							<Box m="65px 0 25px 0">
								<Typography variant="h3">{item?.title}</Typography>
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
								{newItem !== undefined && (
									<Button
										onClick={() =>
											dispatch(addToCart({ item: { ...newItem, count } }))
										}
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
						{relatedIsLoading ? (
							<Box display="flex" justifyContent="center" alignItems="center">
								<CircularProgress
									sx={{
										color:
											theme.palette.mode === "dark"
												? colors.secondary[800]
												: colors.secondary[200],
									}}
								/>
							</Box>
						) : (
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
									{relatedItems?.products.slice(0, 4).map((item, i) => (
										<Item
											key={`${item.title}-${i}`}
											item={item}
											width="300px"
										/>
									))}
								</Box>
							</>
						)}
					</Box>
				</>
			)}
		</Box>
	)
}

export default ItemDetails
