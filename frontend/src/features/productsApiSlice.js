import { PRODUCTS_URL } from '../constants.js'
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            transformResponse: (response) => response.products, // Extract products from the response
            keepUnusedDataFor: 2, 
        }),
        getProductDetails: builder.query({
            query:(productId) =>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 2, 
            transformResponse: (response) => response.singleProduct, // Extract products from the response
        }), 
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
