import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dolarApi = createApi({
  reducerPath: "dolarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dolar-api-argentina.vercel.app/v1/dolares/",
  }),
  endpoints: (builder) => ({
    getDolarOficial: builder.query({
      query: () => "oficial/",
    }),
    getDolarMep: builder.query({
      query: () => "bolsa/",
    }),
    getDolarBlue: builder.query({
      query: () => "blue/",
    }),
  }),
});

export const {
  useGetDolarOficialQuery,
  useGetDolarMepQuery,
  useGetDolarBlueQuery,
} = dolarApi;
