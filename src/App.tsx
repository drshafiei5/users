import React from "react"
import { Route, Link, Routes } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Users from "./features/users/Users"
import LikedUsers from "./features/users/LikedUsers"
import EmptyState from "./components/EmptyState"

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Users" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="liked">
          <ListItemText primary="Liked Users" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route index element={<Users />} />
          <Route path="/liked" element={<LikedUsers />} />
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App
