import {apiSlice} from "./apiSlice";

const authSlice = apiSlice.injectEndpoints({
    overriderExisting: true,
    endpoints: (builder) =>({
    
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
                url: `/signup`,
                method: 'POST',
                body: {
                    ...obj
                },
              }),
        }),
    })
})

export const { useUserLoginMutation, useUserSignupMutation } = authSlice
