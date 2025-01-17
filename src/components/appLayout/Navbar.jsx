import { AppBar, Toolbar, IconButton, Box, useTheme, Button } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ViewList as ViewListIcon, ViewModule as ViewModuleIcon, LightMode, DarkMode } from '@mui/icons-material';
import logo from '../../assets/logo.png'
import { useSelector } from 'react-redux';
import WeatherData from '../weather/WeatherData';

const Navbar = ({ handleThemeToggle, handleViewToggle, handleSidebarToggle,viewMode,isDarkMode,handleLoginButtonClick }) => {
    const theme = useTheme();
    const {isAuthenticated} = useSelector((state) => state.todo.user);

    return (
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.background.default,
            height: '64px',
            color: theme.palette.text.primary,
            boxShadow: 'none',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center', 
            }}
          >
            {/* Left side: Menu Icon and Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                sx={{ color: isDarkMode ? 'white' : 'black', marginRight: 1 }}
                aria-label="menu"
                onClick={handleSidebarToggle}
              >
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="Logo" style={{ height: '30px', width: '90px' }} />
            </Box>
            {isAuthenticated && <WeatherData/>}
            {/* Right side: Search Icon, View Toggle, and Theme Toggle
             */}
            {(!isAuthenticated) ?
          <Button color="inherit" onClick={handleLoginButtonClick}>
            Login
          </Button>:
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{  }}>
                <SearchIcon />
              </IconButton>
              <IconButton
                onClick={handleViewToggle}
                sx={{  }}
              >
                {viewMode === 'list' ?<ViewModuleIcon /> : <ViewListIcon /> }
              </IconButton>
              <IconButton
                onClick={handleThemeToggle}
                sx={{}}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box> }
          </Toolbar>
        </AppBar>
      );
      
};

export default Navbar;
