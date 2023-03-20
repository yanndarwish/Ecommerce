import { combineReducers } from "@reduxjs/toolkit"

import productsSlice from "./productsSlice"
import { productsApi } from "./productsApi"

const rootReducer = combineReducers({
	productsSlice,
	[productsApi.reducerPath]: productsApi.reducer,
})

export default rootReducer
