import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";

export const chatbotApi = createApi({
  reducerPath: "chatbotApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    uploadData: builder.mutation<{wear: string}, FormData>({
      query(data) {
        return {
          method: "POST",
          url: "/upload",
          body: data,
        };
      },
    })
  }),
});

export const {
  useUploadDataMutation,
} = chatbotApi;
