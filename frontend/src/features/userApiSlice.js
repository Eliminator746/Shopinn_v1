import { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        credentials: 'include' // For cookies
      }),
    }),
    profile: builder.mutation({
      query:(data) => ({
        url:`${USERS_URL}/profile`,
        method:'PUT',
        body:data
      })
    }),
    getUsers: builder.query({
      query: (params = {}) => ({
        url: `${USERS_URL}`,
        params: {
          search: params.search || '',
          sortBy: params.sortBy || 'newest',
          filterAdmin: params.filterAdmin, // Remove the || '' to allow false values
        },
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response) => response.data,
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query:(id)=>({
        url:`${USERS_URL}/:id`
      }),
      keepUnusedDataFor: 2,
      transformResponse: (response)=> response.data.user
    }),
    updateUser: builder.mutation({
      query:(id)=>({
        url:`${USERS_URL}/${id}`,
        method:'PUT',
      }),
      invalidatesTags:['User']
    }),
    deleteUser: builder.mutation({
      query:(id)=>({
        url:`${USERS_URL}/${id}`,
        method:'DELETE',
      }),
      invalidatesTags:['User']
    }),
  }),
});

export const {  useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation} = userApiSlice;
