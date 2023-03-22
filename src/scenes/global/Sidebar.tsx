import {
	Box,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../state/hooks"
import CloseIcon from "@mui/icons-material/Close"
import styled from "@emotion/styled"
import { shades } from "../../theme"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import { setIsSideOpen } from "../../state/productsSlice"

const FlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Sidebar = () => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const dispatch = useAppDispatch()
	const isSideOpen = useAppSelector((state) => state.productsSlice.isSideOpen)
	const overlayRef = useRef()

	const closeSide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === overlayRef.current) {
			dispatch(setIsSideOpen())
		}
	}
	return (
		<Box //OVERLAY
			ref={overlayRef}
			display={isSideOpen ? "block" : "none"}
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
			onClick={(e) => closeSide(e)}
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
						<Typography variant="h3">MENU</Typography>
						<IconButton onClick={() => dispatch(setIsSideOpen())}>
							<CloseIcon />
						</IconButton>
					</FlexBox>
					{/* NAV LIST */}
					<Box>
						<Box
							display="flex"
							justifyContent="space-evenly"
							alignItems="center"
							flexDirection="column"
							height="80vh"
							width="100%"
							sx={{
								color:
									theme.palette.mode === "dark" ? "white !important" : "black",
							}}
						>
							<Link
								onClick={() => dispatch(setIsSideOpen())}
								to="/"
								style={{
									color: theme.palette.mode === "dark" ? "white" : "black",
									fontSize: "24px",
									fontWeight: "bold",
								}}
							>
								Home
							</Link>
							<Divider sx={{ width:"100%"}}/>
							<Typography variant="h3">Categories</Typography>
							<Link
								onClick={() => dispatch(setIsSideOpen())}
								to="/products/all"
								style={{
									color: theme.palette.mode === "dark" ? "white" : "black",
									fontSize: "24px",
									fontWeight: "bold",
								}}
							>
								Home
							</Link>
							<Link
								onClick={() => dispatch(setIsSideOpen())}
								to="/products/skincare"
								style={{
									color: theme.palette.mode === "dark" ? "white" : "black",
									fontSize: "24px",
									fontWeight: "bold",
								}}
							>
								Skincare
							</Link>
							<Link
								onClick={() => dispatch(setIsSideOpen())}
								to="/products/home"
								style={{
									color: theme.palette.mode === "dark" ? "white" : "black",
									fontSize: "24px",
									fontWeight: "bold",
								}}
							>
								Kitchen
							</Link>
							<Link
								to="/products/tech"
								onClick={() => dispatch(setIsSideOpen())}
								style={{
									color: theme.palette.mode === "dark" ? "white" : "black",
									fontSize: "24px",
									fontWeight: "bold",
								}}
							>
								Electronics
							</Link>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Sidebar
