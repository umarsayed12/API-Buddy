import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /**
     * Save a single test run to history
     * @param {{
     *  testType: "manual" | "collection",
     *  testName: string,
     *  request: {
     *    name: string,
     *    method: string,
     *    url: string,
     *    body?: any,
     *    headers?: { [key: string]: string }
     *  },
     *  response: {
     *    status: number,
     *    data: any,
     *    duration: number,
     *    isSuccess: boolean,
     *    warning?: string,
     *    errorSummary?: string
     *  }
     * }} data
     */
    saveTestHistory: builder.mutation({
      query: (data) => ({
        url: "/history/save-history",
        method: "POST",
        body: data,
      }),
    }),
    getTestHistory: builder.query({
      query: () => ({
        url: "/history/get-history",
        method: "GET",
      }),
    }),
  }),
});

export const { useSaveTestHistoryMutation, useGetTestHistoryQuery } =
  historyApi;
