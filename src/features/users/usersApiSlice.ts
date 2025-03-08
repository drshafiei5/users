import { apiSlice } from "../../utils/api-service"
import type { User } from "../../app/types"
import { toggleLike } from "./usersSlice"

const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], { name?: string }>({
      query: ({ name }) => {
        const queryParams = name ? `?name=${encodeURIComponent(name)}` : ""
        return `/users${queryParams}`
      },
    }),
    toggleUserFavorite: builder.mutation<User, Partial<User>>({
      query: ({ id, isFavorite }) => ({
        method: "PUT",
        url: `/users/${id}`,
        body: { isFavorite },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled
          dispatch(toggleLike(updatedUser))
        } catch (error) {
          console.error("Failed to toggle favorite status:", error)
        }
      },
    }),
  }),
})

export const { useGetUsersQuery, useToggleUserFavoriteMutation } =
  apiSliceWithUsers
