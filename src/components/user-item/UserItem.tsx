import React, { useCallback, useMemo, useState } from "react"
import {
  StyledCard,
  UserContainer,
  AvatarContainer,
  UserInfo,
  UserName,
  Description,
  UserDescription,
  AnimatedFavoriteIcon,
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
    const [animate, setAnimate] = useState(false)

    const handleToggleFavorite = useCallback(async () => {
      try {
        await updateUser({ ...user, isFavorite: !isUserLiked }).unwrap()
        setAnimate(true)
        setTimeout(() => setAnimate(false), 500) // Reset animation state after 500ms
      } catch (error) {
        console.error("Failed to update user:", error)
      }
    }, [isUserLiked, updateUser, user])

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
                <AnimatedFavoriteIcon
                  animate={animate}
                  onClick={handleToggleFavorite}
                  aria-label={tooltipTitle}
                  isLiked={isUserLiked}
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
