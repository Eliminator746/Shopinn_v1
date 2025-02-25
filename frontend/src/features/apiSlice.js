// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'], // used to define types of data we are fetching from APIs
  endpoints: (builder) => ({}),
});
