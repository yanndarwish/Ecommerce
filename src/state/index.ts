import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Item {
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

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload
		},
		addToCart: (state, action: PayloadAction<{ item: Item }>) => {
			state.cart = [...state.cart, { ...action.payload.item, count: 1 }]
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload.id)
		},
		increaseCount: (state, action: PayloadAction<CartItem>) => {
			state.cart = state.cart.map((item) => {
				if (item.id === action.payload.id) {
					item.count++
				}
				return item
			})
		},
		decreaseCount: (state, action: PayloadAction<CartItem>) => {
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
})

export const {
	setItems,
	addToCart,
	removeFromCart,
	increaseCount,
	decreaseCount,
	setIsCartOpen,
} = cartSlice.actions
export default cartSlice.reducer
