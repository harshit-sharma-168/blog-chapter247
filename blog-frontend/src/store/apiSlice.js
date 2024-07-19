// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const customBaseQuery = fetchBaseQuery({baseUrl: 'http://localhost:3001/api'});

const baseQueryWithAuthFn = async (args, api, extraOptions) => {
  const token = true;
  args.headers = args.headers || {};

  if(token){
    args.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await customBaseQuery(args,api,extraOptions);
    return response;
  } catch (error) {
    console.log('errrrr', error);
  }
}
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuthFn,
  tagTypes: ['blog'],
  endpoints: (builder) => ({

    blog: builder.mutation({
        query: (updatedTodo) => ({
            url: `/todos/${updatedTodo.id}`,
            method: 'POST',
            body: updatedTodo,
          }),
    }),

    userLogin: builder.mutation({
      query: (obj) => ({
          url: `/auth/login`,
          method: 'POST',
          body: {
              ...obj
          },
        }),
  }),

  userSignup: builder.mutation({
      query: (obj) => ({
          url: `/auth/signup`,
          method: 'POST',
          body: {
              ...obj
          },
        }),
  }),
  }),
});

export const { useBlogMutation, useUserLoginMutation, useUserSignupMutation } = apiSlice
