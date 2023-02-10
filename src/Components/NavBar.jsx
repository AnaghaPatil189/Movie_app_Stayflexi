import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" align="center" sx={{ flexGrow: 1 }}>
            Movie Search App- Find Your Favourite
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}