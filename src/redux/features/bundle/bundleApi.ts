import baseAPI from '@/redux/api/baseAPI';

const bundleApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		bundleList: builder.query({
			query: () => ({
				url: '/bundles',
				method: 'GET',
			}),
		}),
	}),
});

export const { useBundleListQuery } = bundleApi;
