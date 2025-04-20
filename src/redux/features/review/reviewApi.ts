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
		}),
	}),
});

export const { useReviewMutation } = reviewApi;
