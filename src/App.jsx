import { ThemeProvider } from "@emotion/react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { createTheme } from "@mui/material"
import AppLayout from "./components/appLayout/AppLayout"
import { useState } from "react"
import WeatherData from "./components/weather/WeatherData"

const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);


    const theme = createTheme({
      palette: {
        mode: !isDarkMode ? 'dark' : 'light',
        background: {
          default: isDarkMode ? '#FBFDFC' : '#242424',
          paper: isDarkMode ? '#dceadd' : '#232323',
        },
        text: {
          primary: isDarkMode ? '#1B281B' : '#FBFDFC',
        },
      },
    });

  return (
    <ThemeProvider theme={theme}>
      <AppLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}>
        <TodoInput />
        <TodoList />
      </AppLayout>
    </ThemeProvider>
  )
}
export default App