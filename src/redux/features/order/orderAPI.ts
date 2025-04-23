import baseAPI from "@/redux/api/baseAPI";

const orderAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: ({ orderId, customer }) => ({
        url: `/order/${orderId}`,
        method: "GET",
        params: { customer },
      }),
      providesTags: ["Order"],
    }),

    getOrders: builder.query({
      query: ({ customer }) => ({
        url: `/orders`,
        method: "GET",
        params: { customer },
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: ({ orderId }) => `/orders/${orderId}`,
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrderQuery, useGetOrdersQuery, useGetOrderByIdQuery } =
  orderAPI;
