import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import Home from "../scenes/home/Home"
import ItemDetails from "../scenes/itemDetails/ItemDetails"
import Checkout from "../scenes/checkout/Checkout"
import Confirmation from "../scenes/checkout/Confirmation"
import ShoppingList from "../scenes/shoppingList/ShoppingList"

const router = createBrowserRouter([
	{
		path: "/Ecommerce",
		element: <Root />,
		children: [
			{
				path: "/Ecommerce",
				element: <Home />,
			},
			{
				path: "/Ecommerce/item/:itemId",
				element: <ItemDetails />,
			},
			{
				path: "/Ecommerce/products/:category",
				element: <ShoppingList />,
			},
			{
				path: "/Ecommerce/checkout",
				element: <Checkout />,
			},
			{
				path: "/Ecommerce/checkout/success",
				element: <Confirmation />,
			},
		],
	},
])

export default router
