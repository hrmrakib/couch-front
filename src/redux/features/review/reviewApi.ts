import baseAPI from "@/redux/api/baseAPI";

const reviewApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		review: builder.mutation({
			query: ({
				id,
				type,
				review,
			}: {
				id: string;
				type: "products" | "bundles";
				review: {
					rating: number;
					content: string;
				};
			}) => ({
				url: `/${type}/${id}/review`,
				method: "PATCH",
				body: review,
			}),
			invalidatesTags: ["reviews"],
		}),

		getReviews: builder.query({
			query: ({
				id,
				type,
				limit = 10,
				page = 1,
			}: {
				id: string;
				type: "products" | "bundles";
				limit?: number;
				page?: number;
			}) => ({
				url: `/${type}/${id}/reviews?page=${page}&limit=${limit}`,
				method: "GET",
			}),
			providesTags: ["reviews"],
		}),

		deleteReview: builder.mutation({
			query: ({ id }: { id: string }) => ({
				url: `/reviews/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: ["reviews"],
		}),
	}),
});

export const {
	useReviewMutation,
	useGetReviewsQuery,
	useDeleteReviewMutation,
} = reviewApi;
