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
} from "@mui/material"
import {
	FavoriteBorderOutlined,
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

const ItemDetails = () => {
	const dispatch = useAppDispatch()
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const { itemId } = useParams()
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
		if (item?.category) {
			setItemsSkip(false)
		}
	}

	useEffect(() => {
		getItem()
	}, [itemId])

	useEffect(() => {
		getRelatedItems()
	}, [item])
	return (
		<Box width="80%" m="80px auto">
			<Box display="flex" flexWrap="wrap" columnGap="40px">
				{/* IMAGES */}
				<Box flex="1 1 40%" mb="40px">
					<img
						src={item?.images[0]}
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
						{item !== undefined && (
							<Button
								onClick={() =>
									dispatch(addToCart({ item: { ...item, count } }))
								}
								sx={{
									fontWeight: "600",
									color: colors.primary[300],
									backgroundColor: colors.secondary[800],
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
                        <Item key={`${item.title}-${i}`} item={item} width="300px"/>
                    ))}
                </Box>
			</Box>
		</Box>
	)
}

export default ItemDetails
