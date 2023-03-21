import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { productsApi } from "./productsApi"

export interface Item {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
}

interface CartItem {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
	count: number
}

interface CartState {
	isCartOpen: boolean
	cart: CartItem[]
	items: Item[]
}

const initialState: CartState = {
	isCartOpen: false,
	cart: [],
	items: [],
}

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload
		},
		addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
			if (action.payload.item !== undefined) {
				state.cart = [...state.cart, action.payload.item]
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload.id)
		},
		increaseCount: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.map((item) => {
				if (item.id === action.payload.id) {
					item.count++
				}
				return item
			})
		},
		decreaseCount: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.map((item) => {
				if (item.id === action.payload.id && item.count > 1) {
					item.count--
				}
				return item
			})
		},
		setIsCartOpen: (state) => {
			state.isCartOpen = !state.isCartOpen
		},
	},
	extraReducers(builder) {
		builder.addMatcher(
			productsApi.endpoints.getProducts.matchFulfilled,
			(state, action) => {
				state.items = action.payload.products
			}
		)
	},
})

export const {
	setItems,
	addToCart,
	removeFromCart,
	increaseCount,
	decreaseCount,
	setIsCartOpen,
} = productsSlice.actions
export default productsSlice.reducer
