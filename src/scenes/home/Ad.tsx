import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { shades } from "../../theme"
import { useNavigate } from "react-router-dom"
import banner1 from "../../assets/images/ad/banner1.jpg"
import banner2 from "../../assets/images/ad/banner2.jpg"

export interface IAdProps {
	position: string
}

const Ad = (props: IAdProps) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const navigate = useNavigate()
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const isNonMobile = useMediaQuery("(min-width: 600px)")

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
			width="80%"
			margin="100px auto"
			display="flex"
			flexDirection={props.position === "start" ? undefined : "row-reverse"}
			sx={{ opacity: "0" }}
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				height="400px"
				flex="1 1 50%"
				gap="20px"
				sx={{ backgroundColor: colors.primary[700] }}
			>
				<Box width="80%">
					<Typography variant="h2" fontWeight="bold">
						{props.position === "start"
							? "Creative harmonious living"
							: "Comfortable & Elegante Living"}
					</Typography>
					<Typography mt="20px">
						Products are all made to standard sizes so that you can mix and
						match them freely.
					</Typography>
					<Button
						onClick={() => navigate("./products/all")}
						variant="contained"
						fullWidth={false}
						sx={{ fontWeight: "bold", padding: "10px 40px", mt: "20px" }}
					>
						SHOP NOW
					</Button>
				</Box>
			</Box>

			<Box
				flex="1 1 50%"
				height="400px"
				display={isNonMobile ? "block" : "none"}
			>
				<img
					width="100%"
					height="100%"
					src={props.position === "start" ? banner1 : banner2}
					alt="Banner"
					style={{ objectFit: "cover" }}
				/>
			</Box>
		</Box>
	)
}

export default Ad
