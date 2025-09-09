import { PRODUCTS_URL } from '../constants.js';
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
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response) => response.singleProduct, // Extract products from the response
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        // body: data, -> We're not passing data bec, in BE it'll create default sample product
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/product`,
        method: 'PUT',
        body: { ...data }
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response) => response.product
    })

  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation } =
  productsApiSlice;
