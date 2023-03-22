import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { shades } from "../../theme"
import home1 from "../../assets/images/home/home-img-1.jpg"
import home2 from "../../assets/images/home/home-img-2.jpg"
import home3 from "../../assets/images/home/home-img-3.jpg"
import home4 from "../../assets/images/home/home-img-4.jpg"

const Hero = () => {
	const navigate = useNavigate()
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const isNonMobile = useMediaQuery("(min-width: 768px)")

	return (
		<Box
			height="calc(70vh - 60px)"
			maxHeight="700px"
			width="80%"
			margin="100px auto"
			display="grid"
			gridTemplateColumns="repeat(4, minmax(0, 1fr))"
			gridTemplateRows="repeat(2, 1fr)"
			gap="20px"
			sx={{
				"& > div": {
					gridColumn: isNonMobile ? undefined : "span 2",
					gridRow: isNonMobile ? undefined : "span 1",
				},
			}}
		>
			<Box
				onClick={() => navigate("/products/home")}
				position="relative"
				display="flex"
				alignItems="end"
				gridColumn="span 2"
				gridRow="span 2"
				padding="20px"
				overflow="hidden"
			>
				<img
					src={home1}
					alt="Home"
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						objectFit: "cover",
						height: "100%",
						width: "100%",
					}}
				/>

				{/* overlay */}
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					sx={{
						backgroundColor: "rgb(23, 23, 23, 0.7)",
						opacity: "0.4",
						transition: "200ms",
						"&:hover": { opacity: "1" },
					}}
				></Box>
				{/* text */}
				<Typography variant="h2" fontWeight="bold" zIndex="2" color="white">
					Home
				</Typography>
			</Box>
			<Box
				onClick={() => navigate("/products/skincare")}
				position="relative"
				display="flex"
				alignItems="end"
				gridRow="span 2"
				padding="20px"
				overflow="hidden"
			>
				<img
					src={home2}
					alt="Skincare"
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						objectFit: "cover",
						height: "100%",
						width: "100%",
					}}
				/>

				{/* overlay */}
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					sx={{
						backgroundColor: "rgb(23, 23, 23, 0.7)",
						opacity: "0.4",
						transition: "200ms",
						"&:hover": { opacity: "1" },
					}}
				></Box>
				{/* text */}
				<Typography variant="h2" fontWeight="bold" zIndex="2" color="white">
					Skincare
				</Typography>
			</Box>
			<Box
				onClick={() => navigate("/products/home")}
				position="relative"
				display="flex"
				overflow="hidden"
				alignItems="end"
				padding="20px"
			>
				<img
					src={home3}
					alt="Kitchen"
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						objectFit: "cover",
						height: "100%",
						width: "100%",
					}}
				/>

				{/* overlay */}
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					sx={{
						backgroundColor: "rgb(23, 23, 23, 0.7)",
						opacity: "0.4",
						transition: "200ms",
						"&:hover": { opacity: "1" },
					}}
				></Box>
				{/* text */}
				<Typography variant="h2" fontWeight="bold" zIndex="2" color="white">
					Kitchen
				</Typography>
			</Box>
			<Box
				onClick={() => navigate("/products/tech")}
				position="relative"
				display="flex"
				overflow="hidden"
				alignItems="end"
				padding="20px"
			>
				<img
					src={home4}
					alt="Electronics"
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						objectFit: "cover",
						height: "100%",
						width: "100%",
					}}
				/>

				{/* overlay */}
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					sx={{
						backgroundColor: "rgb(23, 23, 23, 0.7)",
						opacity: "0.4",
						transition: "200ms",
						"&:hover": { opacity: "1" },
					}}
				></Box>
				{/* text */}
				<Typography variant="h2" fontWeight="bold" zIndex="2" color="white">
					Tech
				</Typography>
			</Box>
		</Box>
	)
}

export default Hero
