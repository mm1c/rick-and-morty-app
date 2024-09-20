import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getRoutes, paths } from "../../routes";
import { NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { config } from "../../config";

const StyledNavLink = styled(NavLink)({
  "&.active": {
    color: "#edff00",
  },
});

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const routes = useMemo(
    () => getRoutes()?.filter((route) => route.showInNavigation !== false),
    []
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState: boolean) => !prevState);
  };

  const goToRoot = () => navigate(paths.root);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={goToRoot}>
        {config.appName}
      </Typography>
      <Divider />
      <List>
        {routes?.map((route) => (
          <ListItem key={route.routeName} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={StyledNavLink}
              to={route.path}
            >
              <ListItemText primary={route.routeName?.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={goToRoot}
          >
            {config.appName}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {routes?.map((route) => (
              <Button
                key={route.routeName}
                sx={{ color: "#fff" }}
                component={StyledNavLink}
                to={route.path}
              >
                {route.routeName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
