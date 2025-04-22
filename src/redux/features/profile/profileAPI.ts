import baseAPI from "@/redux/api/baseAPI";

const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<void, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation<void, void>({
      query: (profile) => ({
        url: "/profile",
        method: "PUT",
        body: profile,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI;
