import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./state"
import "./index.css"

const store = configureStore({
	reducer: { cart: cartReducer },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
