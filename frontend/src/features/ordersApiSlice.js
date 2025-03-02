import { apiSlice } from './apiSlice.js';
import { ORDERS_URL } from '../constants.js';
// import { response } from 'express'; This lead to white screen. Fixed
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...data },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      transformResponse: (response) => response.products,
      keepUnusedDataFor: 2,
    }),

    // /api/v1/orders/:orderId
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
    }),
    getOrder: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response) => response.orders,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice;
