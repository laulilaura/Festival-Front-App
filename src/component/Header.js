import * as React from 'react';
import {Link} from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CasinoIcon from '@mui/icons-material/Casino';

import {AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, createTheme, Button } from '@mui/material';

const theme = createTheme({
  basic: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  special: {
    backgroundColor: 'red',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }
});

const pages = [
  { name: "Home", path: "/", styleSx: theme.basic },
  { name: "Connexion", path: "/connexion", styleSx: theme.basic },
  { name: "Zones", path: "/zones", styleSx: theme.basic },
  { name: "Jeux", path: "/jeux", styleSx: theme.basic },
  //{ name: "Bénévoles", path: "/benevoles", styleSx: theme.special },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" style={{backgroundColor:"#7ACFB0"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* ICI PAGE FORMAT TELEPHONE */}
          <CasinoIcon color='#1C5588' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></CasinoIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            FestiFun
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#1C5588"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <div>
              {pages.map((page) => (
                <Link key={page.name} to={page.path} onClick={handleCloseNavMenu}>
                  <MenuItem>
                    <Typography textAlign="center" variant="h6" sx={{ color:"#1C5588"}}>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Link key="Bénévoles" to="/benevoles" onClick={handleCloseNavMenu} rel="stylesheet" sx={{ display: 'none' }}>
                <MenuItem>
                  <Typography textAlign="center"  variant="h6" >Bénévoles</Typography>
                </MenuItem>
              </Link>
              </div>
            </Menu>
          </Box>
            {/* ICI PAGE FORMAT ORDINATEUR */}
          <CasinoIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            FESTI FUN
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent: 'space-around'}}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path} onClick={handleCloseNavMenu} rel="stylesheet" sx={{ display: 'none' }}>
              <MenuItem>
                <Typography textAlign="center"  variant="h6" sx={{ fontSize: page.styleSx }}>{page.name}</Typography>
              </MenuItem>
            </Link>
            ))}
            <Button id="buttonBenevoles" variant="contained" sx={{m: 2, backgroundColor:'#F88F52'}} component={Link} to="/benevoles"> Bénévoles</Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;