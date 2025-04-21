import baseAPI from "@/redux/api/baseAPI";

const bundleApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    bundleList: builder.query({
      query: () => ({
        url: "/bundles",
        method: "GET",
      }),
    }),

    bundleRetrieve: builder.query({
      query: ({ bundleId }) => ({
        url: `/bundles/${bundleId}`,
        method: "GET",
      }),
    }),

    bundleCheckout: builder.mutation({
      query: ({ bundleId, data }) => ({
        url: `/bundles/${bundleId}/checkout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useBundleListQuery,
  useBundleRetrieveQuery,
  useBundleCheckoutMutation,
} = bundleApi;
