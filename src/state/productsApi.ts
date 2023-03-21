import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Item } from "./productsSlice"

interface ApiResponse {
	limit: number
	skip: number
	total: number
	products: Item[]
}


export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
	endpoints: (builder) => ({
		getProducts: builder.query<ApiResponse, void>({
			query: () => ({
				url: "/products",
			}),
		}),
		getProduct: builder.query<Item, string | undefined>({
			query: (id) => ({
				url: `/products/${id}`,
			}),
		}),
		getRelatedProducts: builder.query<ApiResponse, string | undefined>({
			query: (category) => ({
				url: `/products/category/${category}`,
			}),
		}),
	}),
})
//  limit: number; skip: number; total: number; products: Item[]
export const { useGetProductsQuery, useGetProductQuery, useGetRelatedProductsQuery } = productsApi
