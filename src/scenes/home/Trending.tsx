import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {
	Box,
	Typography,
	Button,
	useMediaQuery,
	useTheme,
	IconButton,
} from "@mui/material"
import { shades } from "../../theme"
import { ArrowLeft } from "@mui/icons-material"
import { ArrowRight } from "@mui/icons-material"
import { products } from "../../data/data"
import Item from "../../components/Item"
import { useRef, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
}
const trending = products.slice(0, 5)

const Trending = () => {
	return (
		<Box width="80%" margin="30px auto" overflow="hidden" sx={{"& .react-multiple-carousel__arrow": {
			zIndex: 2
		}}}>
			<Box display="flex" justifyContent="space-between" mb="30px">
				<Typography variant="h3" fontWeight="bold">
					Trending Now
				</Typography>
				<Box display="flex" gap="10px"></Box>
			</Box>
			<Carousel responsive={responsive} >
				{trending.map((item, i) => (
					<Item item={item} key={i} />
				))}
			</Carousel>
		</Box>
	)
}

export default Trending
