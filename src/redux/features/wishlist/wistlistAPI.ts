import baseAPI from "@/redux/api/baseAPI";

const wishlistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
        body: { productId },
      }),
    }),

    updateWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/sync/${productId}`,
        method: "PATCH",
      }),
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistAPI;
