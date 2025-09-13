import { PRODUCTS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({pageNumber, isAdmin}) => ({
        url: PRODUCTS_URL,
        params:{
          pageNumber,
          isAdmin,
        }
      }),
      // transformResponse : Not req. every data is required not only products
      keepUnusedDataFor: 2,
      providesTags:['Product']
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
      invalidatesTags:['Product']
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/product`,
        method: 'PUT',
        body: { ...data }
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response) => response.product,
      invalidatesTags:['Product']
    }),
    deleteProduct: builder.mutation({
      query:(productId)=>({
        url:`${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Product']
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product']
    })
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation,
  useCreateReviewMutation
} = productsApiSlice;
