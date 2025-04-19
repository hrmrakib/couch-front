import baseAPI from '@/redux/api/baseAPI';

const cartApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		cartSync: builder.mutation({
			query: ({ details }) => ({
				url: '/cart/sync',
				method: 'PATCH',
				body: { details },
			}),
		}),
	}),
});

export const { useCartSyncMutation } = cartApi;
