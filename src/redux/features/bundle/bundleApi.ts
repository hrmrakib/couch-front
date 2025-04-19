import baseAPI from '@/redux/api/baseAPI';

const bundleApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		bundleList: builder.query({
			query: () => ({
				url: '/bundles',
				method: 'GET',
			}),
		}),

		bundleRetrieve: builder.query({
			query: ({ bundleId }) => ({
				url: `/bundles/${bundleId}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useBundleListQuery, useBundleRetrieveQuery } = bundleApi;
