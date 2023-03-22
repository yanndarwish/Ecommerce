import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import { ShoppingBagOutlined, MenuOutlined } from "@mui/icons-material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { useNavigate } from "react-router-dom"
import { ColorModeContext, shades } from "../../theme"
import { setIsCartOpen, setIsSideOpen } from "../../state/productsSlice"

const Navbar = () => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const colorMode = useContext(ColorModeContext)
	const cart = useAppSelector((state) => state.productsSlice.cart)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<Box
			className="appear"
			position="fixed"
			top="0"
			left="0"
			zIndex="10"
			display="flex"
			alignItems="center"
			width="100%"
			height="60px"
			sx={{
				backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
				boxShadow: "0 4px 5px -5px rgba(0,0,0,.23)",
			}}
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="80%"
				margin="auto"
			>
				<Box
					onClick={() => navigate("/")}
					color={theme.palette.mode === "dark" ? "white" : "black"}
					sx={{
						"&:hover": { cursor: "pointer" },
					}}
				>
					<Typography variant="h3" fontWeight="600">
						Ecommerce
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="space-between"
					gap="20px"
					zIndex="2"
				>
					<IconButton
						sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
						onClick={colorMode.toggleColorMode}
					>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlinedIcon />
						) : (
							<LightModeOutlinedIcon />
						)}
					</IconButton>
					<Badge
						badgeContent={cart.length}
						color="secondary"
						invisible={cart.length === 0}
						sx={{
							"& .MuiBadge-badge": {
								right: 5,
								top: 5,
								padding: "0 4px",
								height: "14px",
								minWidth: "13px",
							},
						}}
					>
						<IconButton
							sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
							onClick={() => dispatch(setIsCartOpen())}
						>
							<ShoppingBagOutlined />
						</IconButton>
					</Badge>
					<IconButton
						onClick={() => dispatch(setIsSideOpen())}
						sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
					>
						<MenuOutlined />
					</IconButton>
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar
