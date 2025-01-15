import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getFromLocalStorage,saveToLocalStorage } from "./localstorage";
const api_key = import.meta.env.VITE_API_KEY;


const initialState = getFromLocalStorage() || {
  user: {
    isAuthenticated: false,
    name: "",
    city: "",
    weatherData: {},
    todos: [],
  },
};

export const fetchWeatherData = createAsyncThunk("todos/fetchWeather", async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    return response.data
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.user.todos.push(action.payload);
      saveToLocalStorage(state);
    },
    deleteTodo: (state, action) => {
      state.user.todos = state.user.todos.filter((Todo) => Todo.id !== action.payload);
      saveToLocalStorage(state);
    },
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const Todo = state.user.todos.find((Todo) => Todo.id === id);
      if (Todo) {
        Todo.priority = priority;
      }
      saveToLocalStorage(state);
    },
    updateCompletion: (state, action) => {
      const { id, isFinished } = action.payload;
      const Todo = state.user.todos.find((Todo) => Todo.id === id);
      if (Todo) {
        Todo.isFinished = isFinished;
      }
      saveToLocalStorage(state);
    },
    login: (state, action) => {
      state.user.isAuthenticated = true;
      state.user.name = action.payload.name;
      state.user.city = action.payload.city;
      saveToLocalStorage(state);
    },
    logOut: (state) => {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.city = "";
      state.user.todos = [];
      state.user.wearherData = {};
      saveToLocalStorage(state);
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      const data = {
        temp : action?.payload?.main?.temp,
        weather : action?.payload?.weather[0]?.main,
        description: action?.payload?.weather[0]?.description,
        windSpeed: action?.payload?.wind?.speed,
      }
      state.user.weatherData = data;
      saveToLocalStorage(state);
    }).addCase(fetchWeatherData.rejected, (state, action) => {
        console.log(action);
      state.user.weatherData = {};
      saveToLocalStorage(state);
    });
  },
});

export const { addTodo, deleteTodo, setPriority, updateCompletion,login,logOut } = todoSlice.actions;

export default todoSlice.reducer;
