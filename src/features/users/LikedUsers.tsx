import type React from "react"
import { Grid2 as Grid } from "@mui/material"
import ListView from "../../components/ListView"
import UserItem from "../../components/user-item/UserItem"
import { useAppSelector } from "../../app/hooks"
import { selectLikedUsers } from "./usersSlice"
import { useGetUsersQuery } from "./usersApiSlice"

const Users: React.FC = () => {
  const likedUsers = useAppSelector(selectLikedUsers)
  const { isFetching } = useGetUsersQuery(
    { name: "" },
    { skip: likedUsers.length > 0 },
  )

  return (
    <ListView
      data={likedUsers}
      isLoading={isFetching}
      renderRow={user => (
        <Grid key={user.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <UserItem user={user} />
        </Grid>
      )}
      containerStyle={{
        marginTop: "16px",
      }}
    />
  )
}

export default Users
