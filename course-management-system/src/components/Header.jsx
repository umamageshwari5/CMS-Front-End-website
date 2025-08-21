// src/components/Header.jsx

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = ({
  isAuthenticated,
  onLogout,
  onLoginClick,
  onRegisterClick,
  onAdminLoginClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Course Management System
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {isAuthenticated ? (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={onLoginClick}>
                Student Login
              </Button>
              <Button color="inherit" onClick={onAdminLoginClick}>
                Admin Login
              </Button>
              <Button color="inherit" onClick={onRegisterClick}>
                Register
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}>
            {isAuthenticated ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  onLogout();
                }}>
                Logout
              </MenuItem>
            ) : (
              [
                <MenuItem
                  key="login"
                  onClick={() => {
                    handleClose();
                    onLoginClick();
                  }}>
                  Student Login
                </MenuItem>,
                <MenuItem
                  key="admin-login"
                  onClick={() => {
                    handleClose();
                    onAdminLoginClick();
                  }}>
                  Admin Login
                </MenuItem>,
                <MenuItem
                  key="register"
                  onClick={() => {
                    handleClose();
                    onRegisterClick();
                  }}>
                  Register
                </MenuItem>,
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
