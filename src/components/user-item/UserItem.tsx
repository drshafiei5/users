import React, { useCallback, useMemo } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"
import {
  StyledCard,
  UserContainer,
  AvatarContainer,
  UserInfo,
  UserName,
  Description,
  UserDescription,
} from "./styles"
import { Box, Tooltip, Avatar } from "@mui/material"
import type { User } from "../../app/types"
import { useToggleUserFavoriteMutation } from "../../features/users/usersApiSlice"
import { useAppSelector } from "../../app/hooks"
import { selectIsUserLiked } from "../../features/users/usersSlice"

interface UserItemProps {
  user: User
}

const UserItem: React.FC<UserItemProps> = React.memo(
  ({ user }) => {
    const [updateUser] = useToggleUserFavoriteMutation()
    const isUserLiked = useAppSelector(state =>
      selectIsUserLiked(state, user.id),
    )

    const handleToggleFavorite = useCallback(async () => {
      try {
        await updateUser({ ...user, isFavorite: !user.isFavorite }).unwrap()
      } catch (error) {
        console.error("Failed to update user:", error)
      }
    }, [updateUser, user])

    const tooltipTitle = useMemo(
      () => (isUserLiked ? "Remove from Favorites" : "Add to Favorites"),
      [isUserLiked],
    )

    return (
      <StyledCard>
        <UserContainer>
          <AvatarContainer>
            <Avatar src={user.avatar} alt={user.name} />
          </AvatarContainer>

          <UserInfo>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <UserName>{user.name}</UserName>
              <Tooltip title={tooltipTitle}>
                <FavoriteIcon
                  sx={{
                    cursor: "pointer",
                    color: isUserLiked ? "red" : "text.secondary",
                  }}
                  onClick={handleToggleFavorite}
                  aria-label={tooltipTitle}
                />
              </Tooltip>
            </Box>

            <Description>
              <UserDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                ducimus ullam, corporis eos inventore sed.
              </UserDescription>
            </Description>
          </UserInfo>
        </UserContainer>
      </StyledCard>
    )
  },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id,
)

export default UserItem
