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
      query: ({ productId }: { productId: string }) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    updateWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/sync/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ productId }: { productId: string }) => ({
        url: `/wishlist/${productId}/remove`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"], 
    }),

    existWishlist: builder.query({
      query: ({ productId }: { productId: string }) => ({
        url: `/wishlist/exists/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useUpdateWishlistMutation,
  useExistWishlistQuery,
} = wishlistAPI;
