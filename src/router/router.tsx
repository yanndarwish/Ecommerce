import { createBrowserRouter, redirect } from "react-router-dom"
import Root from "./Root"
import Home from "../scenes/home/Home"
import ItemDetails from "../scenes/itemDetails/ItemDetails"
import Checkout from "../scenes/checkout/Checkout"
import Confirmation from "../scenes/checkout/Confirmation"
import { productsApi } from "../state/productsApi"
import { store } from "../state/store"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
				loader: async () => {
					const p = store.dispatch(productsApi.endpoints.getProducts.initiate())

					try {
						const response = await p.unwrap()
						return response
					} catch (e) {
						// redirect to error page instead
						return redirect("/login")
					} finally {
						p.unsubscribe()
					}
				},
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
