import  { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/todo/todoSlice';

function LoginPopup({ open, handleClose }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (name.trim() && city.trim()) {
        dispatch(login({ name, city }));
        setCity('');
        setName('');
      handleClose();
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="city"
          type="city"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPopup;
