import type React from "react"
import { useState, useMemo } from "react"
import { Grid2 as Grid } from "@mui/material"
import TextField from "@mui/material/TextField"
import ListView from "../../components/ListView"
import UserItem from "../../components/user-item/UserItem"
import { useGetUsersQuery } from "./usersApiSlice"
import type { User } from "../../app/types"
import useDebounce from "../../hooks/useDebounce"

const DEBOUNCE_DELAY = 1000

const Users: React.FC = () => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(currentSearchTerm, DEBOUNCE_DELAY)

  const { isError, isFetching, data } = useGetUsersQuery({
    name: debouncedSearchTerm,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchTerm(e.target.value)
  }

  const renderContent = (user: User) => (
    <Grid key={user.id} size={{ xs: 12, md: 6, lg: 4 }}>
      <UserItem user={user} />
    </Grid>
  )

  const filteredData = useMemo(() => {
    return isError ? [] : data
  }, [isError, data])

  return (
    <div style={{ padding: "16px" }}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        value={currentSearchTerm}
        margin="normal"
      />
      <ListView
        isLoading={isFetching}
        data={filteredData}
        renderRow={renderContent}
        containerStyle={{
          marginTop: "16px",
        }}
      />
    </div>
  )
}

export default Users
