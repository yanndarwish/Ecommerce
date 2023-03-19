import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { Badge, Box, IconButton, Typography } from "@mui/material"
import {
	PersonOutline,
	ShoppingBagOutlined,
	MenuOutlined,
	SearchOutlined,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { shades, useMode } from "../../theme"
import { setIsCartOpen } from "../../state"

export interface INavbarProps {}

const Navbar = (props: INavbarProps) => {
	const [theme, colorMode] = useMode()
	const colors = shades(theme.palette.mode)
	const cart = useAppSelector((state) => state.cart.cart)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<Box
			position="fixed"
			top="0"
			left="0"
			zIndex="1"
			display="flex"
			alignItems="center"
			width="100%"
			height="60px"
			sx={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
			color="black"
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
					color={colors.primary[500]}
					sx={{
						"&:hover": { cursor: "pointer" },
					}}
				>
					<Typography variant="h3">Ecommerce</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="space-between"
					gap="20px"
					zIndex="2"
				>
					<IconButton sx={{ color: "black" }}>
						<SearchOutlined />
					</IconButton>
					<IconButton sx={{ color: "black" }}>
						<PersonOutline />
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
							sx={{ color: "black" }}
							onClick={() => dispatch(setIsCartOpen())}
						>
							<ShoppingBagOutlined />
						</IconButton>
					</Badge>
					<IconButton sx={{ color: "black" }}>
						<MenuOutlined />
					</IconButton>
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar
