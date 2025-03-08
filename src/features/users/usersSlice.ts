import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { User } from "../../app/types"

export interface LikedUsersSliceState {
  likedUsers: User[]
}

const initialState: LikedUsersSliceState = {
  likedUsers: [],
}

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    toggleLike: create.reducer((state, action: PayloadAction<User>) => {
      const userId = action.payload.id
      const existingUserIndex = state.likedUsers.findIndex(
        user => user.id === userId,
      )

      if (existingUserIndex !== -1) {
        // User exists, remove them from the likedUsers array
        state.likedUsers.splice(existingUserIndex, 1)
      } else {
        // User doesn't exist, add them to the likedUsers array
        state.likedUsers.push(action.payload)
      }
    }),
    setUsers: create.reducer((state, action: PayloadAction<User[]>) => {
      // Set the entire likedUsers array with the provided array
      state.likedUsers = action.payload
    }),
  }),
  selectors: {
    selectLikedUsers: state => state.likedUsers,
    selectIsUserLiked: (state: LikedUsersSliceState, userId: string) =>
      state.likedUsers.some(({ id }) => id === userId),
  },
})

// Action creators
export const { toggleLike, setUsers } = usersSlice.actions

// Selectors
export const { selectLikedUsers, selectIsUserLiked } = usersSlice.selectors
