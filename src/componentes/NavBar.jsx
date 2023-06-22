import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Link to="/libros" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textTransform: "none",
                marginRight: "10px",
              }}
            >
              Libros
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            marginRight: "10px",
          }}
        >
          <Link to="/bibliotecas" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textTransform: "none",
              }}
            >
              Bibliotecas
            </Button>
          </Link>
        </Box>
        <Button
          color="inherit"
          sx={{ textTransform: "none", marginRight: "10px" }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
}