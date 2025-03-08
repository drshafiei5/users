import type React from "react"
import { Grid2 as Grid } from "@mui/material"
import ListView from "../../components/ListView"
import UserItem from "../../components/user-item/UserItem"
import { useAppSelector } from "../../app/hooks"
import { selectLikedUsers } from "./usersSlice"

const Users: React.FC = () => {
  const likedUsers = useAppSelector(selectLikedUsers)

  return (
    <ListView
      data={likedUsers}
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
