import baseAPI from "@/redux/api/baseAPI";

const tradeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postTrade: builder.mutation({
      query: (data) => ({
        url: "/trades/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trade"],
    }),
  }),
});

export const { usePostTradeMutation } = tradeAPI;
