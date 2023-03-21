import { useTheme, Box, Typography } from "@mui/material"
import { shades } from "../../theme"

const Footer = () => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)

	return (
		<Box mt="70px" p="40px 0" sx={{ backgroundColor: colors.primary[800] }}>
			<Box
				width="80%"
				margin="auto"
				display="flex"
				justifyContent="space-between"
				flexWrap="wrap"
				rowGap="30px"
				columnGap="clamp(20px, 30px, 40px)"
			>
				<Box width="clamp(20%, 30%, 40%)">
					<Typography
						variant="h4"
						fontWeight="bold"
						mb="30px"
						color={colors.secondary[100]}
					>
						ECOMMERCE
					</Typography>
					<div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A
						distinctio veniam accusantium aspernatur voluptatum delectus modi
						repudiandae dolorem sequi laudantium placeat quos ipsa, sunt vitae,
						fuga nihil rem atque praesentium.
					</div>
				</Box>
				<Box>
					<Typography variant="h4" fontWeight="bold" mb="30px">
						About Us
					</Typography>
					<Typography mb="30px">Careers</Typography>
					<Typography mb="30px">Our Stores</Typography>
					<Typography mb="30px">Terms & Conditions</Typography>
					<Typography mb="30px">Privacy Policy</Typography>
				</Box>
				<Box>
					<Typography variant="h4" fontWeight="bold" mb="30px">
						Customer Care
					</Typography>
					<Typography mb="30px">Help Center</Typography>
					<Typography mb="30px">Track Your Order</Typography>
					<Typography mb="30px">Corporate & Bulk Purchasing</Typography>
					<Typography mb="30px">Returns & Refunds</Typography>
				</Box>
				<Box width="clamp(20%, 25%, 30%)">
					<Typography variant="h4" fontWeight="bold" mb="30px">
						Contact Us
					</Typography>
					<Typography mb="30px">
						50 north Whatever Blvd, Washington, DC 10501
					</Typography>
					<Typography mb="30px" sx={{ wordWrap: "break-word" }}>
						Email: something@gmail.com
					</Typography>
					<Typography mb="30px">0123456789</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default Footer
