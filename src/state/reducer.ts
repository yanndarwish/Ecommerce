import { combineReducers } from "@reduxjs/toolkit"
import productsSlice from "./productsSlice"

const rootReducer = combineReducers({
	productsSlice,
})

export default rootReducer
