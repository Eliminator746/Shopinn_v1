import { apiSlice } from './apiSlice.js';
import { ORDERS_URL, PAYPAL_URL } from '../constants.js';
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
        url: `${ORDERS_URL}/myorders`,
      }),
      transformResponse: (response) => response.data,
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

    // /api/v1/orders/:orderId/pay
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details ,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
         url: PAYPAL_URL 
      }),
      keepUnusedDataFor: 2,
    }),    
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} = ordersApiSlice;
