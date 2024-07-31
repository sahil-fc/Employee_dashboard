// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  email: string;
  password: string;
  name:string;
}

interface LoginResponse {
  // Define the shape of the response object from the API
  token: string;
  status: number;
  msg:string;
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    date: Date;
    name:string
  };
}

// Define a service using a base URL and expected endpoints
export const userLoginApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }),
  endpoints: (builder) => ({
    getLogin: builder.mutation<LoginResponse, Partial<Post>>({
      query: (body) => ({
        url: `/userlogin`,
        method: "POST",
        body,
      }),
    }),
    getNextAuth: builder.mutation<LoginResponse, Partial<Post>>({
      query: (body) => ({
        url: `/nextauth`,
        method: "POST",
        body,
      }),
    }),
    getRegister: builder.mutation<LoginResponse, Partial<Post>>({
      query: (body) => ({
        url: `/userregister`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetLoginMutation,useGetNextAuthMutation,useGetRegisterMutation } = userLoginApi;
