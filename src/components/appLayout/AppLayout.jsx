import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoginPopup from "../user/Login";
import { fetchWeatherData } from "../../redux/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const AppLayout = ({ children, setIsDarkMode, isDarkMode }) => {
  const [viewMode, setViewMode] = useState("list");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const user = useSelector((state) => state.todo.user);
  const city = user.city
  const dispatch = useDispatch();

  const handleLoginButtonClick = () => {
    setLoginPopupOpen(!isLoginPopupOpen);
  };

  const theme = useTheme();

  const handleViewToggle = () => {
    setViewMode(viewMode === "list" ? "card" : "list");
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    const loadWeather = async () => {
     dispatch(fetchWeatherData(city));
    };
    if (city) {
      loadWeather();
    }
  }, [dispatch,city]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <LoginPopup
        open={isLoginPopupOpen}
        handleClose={handleLoginButtonClick}
      />
      <Navbar
        handleThemeToggle={handleThemeToggle}
        handleViewToggle={handleViewToggle}
        handleSidebarToggle={handleSidebarToggle}
        handleLoginButtonClick={handleLoginButtonClick}
        viewMode={viewMode}
        isDarkMode={isDarkMode}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        {/* Sidebar is below the navbar */}
        <Box>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </Box>
        {/* Main content appears beside the sidebar */}
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { isDarkMode,viewMode })
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
