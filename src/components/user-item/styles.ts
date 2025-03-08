import { styled, Card, Box, keyframes } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Fonts } from "../../app/types"

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`

export const StyledCard = styled(Card)({
  padding: "24px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  borderRadius: "8px",
})

export const UserContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  "@media (min-width:600px)": {
    flexDirection: "row",
  },
})

export const AvatarContainer = styled(Box)({
  marginRight: "16px",
  marginBottom: "16px",
  "& .MuiAvatar-root": {
    width: "72px",
    height: "72px",
  },
  "@media (min-width:600px)": {
    marginBottom: "0",
  },
})

export const UserInfo = styled(Box)({
  flex: 1,
})

export const UserName = styled("h3")(({ theme }) => ({
  margin: 0,
  fontSize: "18px",
  fontWeight: Fonts.BOLD,
  color: theme.palette.text.primary,
}))

export const ActionsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
})

export const Description = styled(Box)({
  marginTop: "8px",
})

export const UserDescription = styled("p")(({ theme }) => ({
  margin: 0,
  fontSize: "14px",
  color: theme.palette.text.secondary,
}))

export const AnimatedFavoriteIcon = styled(FavoriteIcon)<{
  animate: boolean
  isLiked: boolean
}>(({ animate, isLiked }) => ({
  cursor: "pointer",
  color: isLiked ? "red" : "gray",
  animation: animate ? `${likeAnimation} 0.5s ease` : "none",
}))
