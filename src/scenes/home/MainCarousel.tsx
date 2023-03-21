import {
	Box,
	Typography,
	IconButton,
	useTheme,
	useMediaQuery,
} from "@mui/material"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined"
import { shades } from "../../theme"
import wave2 from "../../assets/wave2.jpg"
import wave3 from "../../assets/wave3.jpg"
import wave4 from "../../assets/wave4.jpg"
import wave5 from "../../assets/wave5.jpg"

const frames = [
	{
		info: "Don't Miss These!",
		title: "Top Trends",
		img: wave4,
	},
	{
		info: "Quick Delivery!",
		title: "Free Shipping",
		img: wave5,
	},
	{
		info: "Long Lifespan",
		title: "Unbreakable",
		img: wave2,
	},
	{
		info: "The Best in the Market!",
		title: "Top Quality",
		img: wave3,
	},
]

export interface IMainCarouselProps {}

const MainCarousel = (props: IMainCarouselProps) => {
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const isNonMobile = useMediaQuery("(min-width: 600px)")

	return (
		<>
			<Carousel
				infiniteLoop={true}
				showThumbs={false}
				showIndicators={false}
				showStatus={false}
				renderArrowPrev={(onClickHandler, hasPrev, label) => (
					<IconButton
						onClick={onClickHandler}
						sx={{
							position: "absolute",
							top: "50%",
							left: "0",
							color: "white",
							padding: "5px",
							zIndex: "10",
						}}
					>
						<NavigateBeforeIcon sx={{ fontSize: 40 }} />
					</IconButton>
				)}
				renderArrowNext={(onClickHandler, hasNext, label) => (
					<IconButton
						onClick={onClickHandler}
						sx={{
							position: "absolute",
							top: "50%",
							right: "0",
							color: "white",
							padding: "5px",
							zIndex: "10",
						}}
					>
						<NavigateNextIcon sx={{ fontSize: 40 }} />
					</IconButton>
				)}
			>
				{frames.map((item, i) => (
					<Box key={`carousel-image-${i}`}>
						<img
							src={item.img}
							alt={`carousel-${i}`}
							style={{
								width: "100%",
								height: "100vh",
								objectFit: "cover",
								backgroundAttachment: "fixed",
							}}
						/>

						<Box
							className="appearLeft"
							position="absolute"
							top="50%"
							left={isNonMobile ? "10%" : "0"}
							right={isNonMobile ? undefined : "0"}
							margin={isNonMobile ? undefined : "0 auto"}
							// maxWidth={isNonMobile ? undefined : "240px"}
							color="white"
							padding="20px"
							borderRadius="1px"
							textAlign="left"
							sx={{
								backgroundColor: "rgb(0,0,0,0.6)",
								// transform: "translateY(-50%)",
							}}
						>
							{isNonMobile && (
								<Typography
									variant="h1"
									fontWeight="bold"
									sx={{
										animation: "appearUp 1s ease-in-out both",
										animationDelay: "0.8s",
									}}
								>
									{item.info}
								</Typography>
							)}
							<Typography
								fontWeight="bold"
								variant="h1"
								m="0"
								color={colors.secondary[300]}
								sx={{
									animation: "appearUp 1s ease-in-out both",
									animationDelay: "1s",
								}}
							>
								{item.title}
							</Typography>
							<Typography
								fontWeight="bold"
								variant="h1"
								m="0"
								color={colors.secondary[500]}
								sx={{
									animation: "appearUp 1s ease-in-out both",
									animationDelay: "1.1s",
								}}
							>
								{item.title}
							</Typography>
							<Typography
								fontWeight="bold"
								variant="h1"
								m="0"
								color={colors.secondary[700]}
								sx={{
									animation: "appearUp 1s ease-in-out both",
									animationDelay: "1.2s",
								}}
							>
								{item.title}
							</Typography>
						</Box>
					</Box>
				))}
			</Carousel>
			<ArrowDownwardOutlinedIcon
				sx={{
					color:"white",
					position: "absolute",
					bottom: "50px",
					left: "50%",
					transform: "translateX(-50%)",
					fontSize: isNonMobile ? "76px" : "64px",
					animation: "fade 2000ms both infinite",
					animationDelay: "2.3s",
				}}
			/>
		</>
	)
}

export default MainCarousel
