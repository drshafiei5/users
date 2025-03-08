import type { User } from "../../app/types"
import { apiSlice } from "../../utils/api-service"
import { setUsers, toggleLike } from "./usersSlice"

const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], { name?: string }>({
      query: ({ name }) =>
        `/users${name ? `?name=${encodeURIComponent(name)}` : ""}`,
      async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
        try {
          const { data: users } = await queryFulfilled
          if (name?.length === 0) {
            dispatch(setUsers(users.filter(u => u.isFavorite)))
          }
        } catch (error) {
          console.error("Failed to fetch users:", error)
        }
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
