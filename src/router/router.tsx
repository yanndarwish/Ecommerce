import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import Home from "../scenes/home/Home"
import ItemDetails from "../scenes/itemDetails/ItemDetails"
import Checkout from "../scenes/checkout/Checkout"
import Confirmation from "../scenes/checkout/Confirmation"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/item/:itemId",
				element: <ItemDetails />,
			},
			{
				path: "/checkout",
				element: <Checkout />,
			},
			{
				path: "/checkout/success",
				element: <Confirmation />,
			},
		],
	},
])

export default router
