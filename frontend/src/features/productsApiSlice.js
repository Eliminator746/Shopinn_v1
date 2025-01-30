import { PRODUCTS_URL } from '../constants.js'
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            transformResponse: (response) => response.products, // Extract products from the response
            keepUnusedDataFor: 5, // Adjust this as needed
        }) 
    })
})

export const { useGetProductsQuery } = productsApiSlice;
