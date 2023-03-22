import {
	Box,
	InputBase,
	Divider,
	Typography,
	IconButton,
	colors,
	useTheme,
} from "@mui/material"
import { MarkEmailReadOutlined } from "@mui/icons-material"
import { shades } from "../../theme"
import { useState } from "react"

const Subscribe = () => {
	const [email, setEmail] = useState("")
	const theme = useTheme()
	const colors = shades(theme.palette.mode)

	return (
		<Box width="80%" margin="80px auto" textAlign="center">
			<IconButton>
				<MarkEmailReadOutlined fontSize="large" />
			</IconButton>
			<Typography variant="h3">Subscribe To Our Newsletter</Typography>
			<Typography>
				and receive $20 coupon for your first order when tou checkout
			</Typography>
			<Box
				p="2px 4px"
				m="15px auto"
				display="flex"
				alignItems="center"
				width="75%"
				sx={{ backgroundColor: colors.primary[800] }}
			>
				<InputBase
					placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					sx={{
						ml: 1,
						flex: 1,
						color: colors.primary[100],
					}}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<Typography sx={{ p: "10px", "&:hover": { cursor: "pointer" } }}>
					Subscribe
				</Typography>
			</Box>
		</Box>
	)
}

export default Subscribe
