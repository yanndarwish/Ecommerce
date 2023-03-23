import {
	Box,
	Button,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../state/hooks"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import styled from "@emotion/styled"
import { shades } from "../../theme"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import {
	decreaseCount,
	increaseCount,
	removeFromCart,
	setIsCartOpen,
} from "../../state/productsSlice"

const FlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const CartMenu = () => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const cart = useAppSelector((state) => state.productsSlice.cart)
	const isCartOpen = useAppSelector((state) => state.productsSlice.isCartOpen)
	const overlayRef = useRef()

	const totalPrice = cart.reduce((total, item) => {
		return total + item.count * parseFloat(item.price)
	}, 0)

	const closeCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === overlayRef.current) {
			dispatch(setIsCartOpen())
		}
	}
	return (
		<Box //OVERLAY
			ref={overlayRef}
			display={isCartOpen ? "block" : "none"}
			position="fixed"
			zIndex={99}
			width="100%"
			height="100%"
			left="0"
			top="0"
			overflow="auto"
			sx={{
				backgroundColor: colors.overlay[100],
			}}
			onClick={(e) => closeCart(e)}
		>
			{/* CART MODAL */}
			<Box
				position="fixed"
				right="0"
				bottom="0"
				width="min(450px, 100%)"
				height="100%"
				sx={{ backgroundColor: colors.primary[900] }}
			>
				<Box padding="30px" overflow="auto" height="100%">
					{/* HEADER */}
					<FlexBox mb="15px">
						<Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
						<IconButton onClick={() => dispatch(setIsCartOpen())}>
							<CloseIcon />
						</IconButton>
					</FlexBox>
					{/* CART LIST */}
					<Box>
						{cart.length === 0 ? (
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								height="200px"
								width="100%"
							>
								<Typography variant="h3" fontWeight="bold">
									Your Cart is Emply
								</Typography>
							</Box>
						) : (
							cart.map((item) => (
								<Box key={item.id}>
									<FlexBox p="15px 0">
										<Box flex="1 1 40%">
											<img
												src={item?.images[0]}
												alt={item?.name}
												width="123px"
												height="164px"
												style={{ objectFit: "cover" }}
											/>
										</Box>
										<Box flex="1 1 60%">
											{/* ITEM NAME */}
											<FlexBox mb="5px">
												<Typography fontWeight="bold">{item.name}</Typography>
												<IconButton
													onClick={() =>
														dispatch(removeFromCart({ id: item.id }))
													}
												>
													<CloseIcon />
												</IconButton>
											</FlexBox>
											{/* ITEM QUANTITY */}
											<FlexBox m="15px 0">
												<Box
													display="flex"
													alignItems="center"
													border={`1.5px solid ${colors.secondary[500]}`}
												>
													<IconButton
														onClick={() =>
															dispatch(decreaseCount({ id: item.id }))
														}
													>
														<RemoveIcon />
													</IconButton>
													<Typography>{item.count}</Typography>
													<IconButton
														onClick={() =>
															dispatch(increaseCount({ id: item.id }))
														}
													>
														<AddIcon />
													</IconButton>
												</Box>
												{/* PRICE */}
												<Typography fontWeight="bold">${item.price}</Typography>
											</FlexBox>
										</Box>
									</FlexBox>
									<Divider />
								</Box>
							))
						)}
					</Box>
					{/* ACTIONS */}
					<Box m="20px 0">
						<FlexBox m="20px 0">
							<Typography fontWeight="bold">SUBTOTAL</Typography>
							<Typography fontWeight="bold">${totalPrice}</Typography>
						</FlexBox>
						<Button
							sx={{
								backgroundColor:
									theme.palette.mode === "dark"
										? colors.secondary[800]
										: colors.secondary[200],
								color: "white",
								fontWeight: "bold",
								minWidth: "100%",
								padding: "20px 40px",
								m: "20px 0",
								"&:hover": {
									backgroundColor: colors.secondary[500],
								},
							}}
							onClick={() => {
								navigate("/Ecommerce/checkout")
								dispatch(setIsCartOpen())
							}}
						>
							CHECKOUT
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default CartMenu
