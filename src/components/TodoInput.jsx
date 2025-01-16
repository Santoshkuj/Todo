import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todo/todoSlice';
import { Box, TextField, Button, Select, MenuItem, Typography } from "@mui/material";
import downArrow from "../assets/caret-down.png";

const TodoInput = ({isDarkMode}) => {
  const [todoInput, setTodoInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('Low');
  const{isAuthenticated} = useSelector((state) => state.todo.user);
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault()
    if (todoInput.trim() && priorityInput) {
      const newTask = {
        id: Date.now(),
        task: todoInput,
        priority: priorityInput,
        isFinished: false,
      };
      dispatch(addTodo(newTask));
      setTodoInput('');
    }
  };

  return isAuthenticated && (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      background: isDarkMode ?'linear-gradient(to top,#dce2e0,#f6faf6)' : 'linear-gradient(to top,rgb(20, 36, 27),rgb(40, 58, 47))',
      maxWidth: "100%",
      height: {sm:"180px"},
      paddingLeft: 1,
    }}
  >
    <div style={{ height: '30px',display: "flex", alignItems: 'center',backgroundColor: !isDarkMode ? '#1B281BB8' : '#f8fbfb', margin: '0', padding: '0',}}>
      <p>To - Do</p>
      <img src={downArrow} alt="" height={24} width={24}/>
    </div>
  
    <Typography
      sx={{
        fontWeight: 400,
        color: !isDarkMode ? "#ffffff" : '#1B281BB8',
        paddingTop: {sm:2},
      }}
    >
      Add A Task
    </Typography>
    <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', }}>
    <TextField
      fullWidth
      variant='standard'
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      placeholder="Add a task"
      sx={{
        '& .MuiInput-underline:before': {
      display: 'none',
    },
      }}
    />
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop: '7px',}}>
    <Box sx={{maxWidth: '200px', width: '100%',}}>
    <Select
      value={priorityInput}
      onChange={(e) => setPriorityInput(e.target.value)}
      variant="standard"
      sx={{
        paddingLeft: 1,
        width: '100%',
      }}
    >
      <MenuItem value="High">High</MenuItem>
      <MenuItem value="Medium">Medium</MenuItem>
      <MenuItem value="Low">Low</MenuItem>
    </Select>
    </Box>
    <Button
      type='submit'
      sx={{
        width: {sm:"100px"},
        padding: 1,
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 1,
        marginRight: 2,
        color: '#357937',
        backgroundColor:'#a7c0b8'
      }}
    >
      Add Task
    </Button>
    </div>
    </form>
  </Box>
  );
};

export default TodoInput;
