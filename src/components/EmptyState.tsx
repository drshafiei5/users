import { Box, Typography, Button } from "@mui/material"
import EmptyIcon from "../assets/404.svg"

interface EmptyStateProps {
  onRefresh?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      textAlign="center"
      padding={2}
    >
      <img
        src={EmptyIcon}
        alt="Empty"
        style={{ maxWidth: "500px", height: "auto" }}
      />
      <Typography variant="h5" color="text.secondary" marginTop={2}>
        No items found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRefresh}
        sx={{ marginTop: 2 }}
      >
        Try Again
      </Button>
    </Box>
  )
}

export default EmptyState
