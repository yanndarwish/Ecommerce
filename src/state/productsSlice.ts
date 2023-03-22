import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const localCart = localStorage.getItem("cartProducts")

interface CartItem {
	id: number
	name: string
	category: string
	description: string
	price: string
	texture: string
	weight: string
	size: string
	images: string[]
	count: number
}

interface CartState {
	isCartOpen: boolean
	isSideOpen: boolean
	cart: CartItem[]
}

const initialState: CartState = {
	isCartOpen: false,
	isSideOpen: false,
	cart: typeof localCart === "string" ? JSON.parse(localCart) : [],
}

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
			if (action.payload.item !== undefined) {
				state.cart = [...state.cart, action.payload.item]
				localStorage.setItem("cartProducts", JSON.stringify(state.cart))
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload.id)
			localStorage.setItem("cartProducts", JSON.stringify(state.cart))
		},
		increaseCount: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.map((item) => {
				if (item.id === action.payload.id) {
					item.count++
				}
				return item
			})
			localStorage.setItem("cartProducts", JSON.stringify(state.cart))
		},
		decreaseCount: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.map((item) => {
				if (item.id === action.payload.id && item.count > 1) {
					item.count--
				}
				return item
			})
			localStorage.setItem("cartProducts", JSON.stringify(state.cart))
		},
		setIsCartOpen: (state) => {
			state.isCartOpen = !state.isCartOpen
		},
		setIsSideOpen: (state) => {
			state.isSideOpen = !state.isSideOpen
		},
	},
})

export const {
	addToCart,
	removeFromCart,
	increaseCount,
	decreaseCount,
	setIsCartOpen,
	setIsSideOpen
} = productsSlice.actions
export default productsSlice.reducer
