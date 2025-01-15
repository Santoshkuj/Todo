import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  useTheme,
  Button,
} from "@mui/material";
import { Task as TaskIcon, Today as TodayIcon } from "@mui/icons-material";
import {
  Star as StarIcon,
  EventNote as EventNoteIcon,
} from "@mui/icons-material";
import profile from "../../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/todo/todoSlice";

const Sidebar = ({ isSidebarOpen }) => {
  const user = useSelector((state) => state.todo.user);
  const { todos } = useSelector((state) => state.todo.user);

  const finishedTodo = todos.filter((task) => task.isFinished).length;
  const dispatch = useDispatch();
  const theme = useTheme();
  const totalTasks = todos.length;
  const pendingTasks = totalTasks - finishedTodo;
  const finishedTasks = finishedTodo;

  const pendingPercentage = (pendingTasks / totalTasks) * 100;
  const finishedPercentage = (finishedTasks / totalTasks) * 100;

  if (!isSidebarOpen) return null;

  return (
    <Box
      sx={{
        width: { xs: "70%", sm: 230, md: 260 },
        height: "calc(100vh - 78px)",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        paddingTop: 2,
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Avatar
          sx={{ width: { xs: 80, sm: 118 }, height: { xs: 80, sm: 118 } }}
          src={profile}
          alt="Profile Image"
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: 1,
            fontWeight: 600,
            fontSize: { xs: "14px", sm: "16px", lg: "18px" },
          }}
        >
          {user?.name ? user?.name : "Hey, ABCD"}
        </Typography>
        {user.isAuthenticated && (
          <Button
            variant="outlined"
            sx={{
              color: "red",
              paddingY: 0,
              marginTop: 1,
              backgroundColor: "#ffffff",
              fontSize: { xs: "12px", sm: "14px" },
            }}
            onClick={() => dispatch(logOut())}
          >
            LogOut
          </Button>
        )}
      </Box>

      {/* Task List */}
      {user.isAuthenticated && (
        <List
          dense
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "10px",
            width: { xs: "90%", sm: "80%" },
          }}
        >
          <ListItem>
            <ListItemIcon
              sx={{
                minWidth: { xs: "30px", sm: "40px" },
              }}
            >
              <TaskIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Total Tasks ${totalTasks > 0 ? totalTasks : ""}`}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon
              sx={{
                minWidth: { xs: "30px", sm: "40px" },
              }}
            >
              <TodayIcon sx={{ color: "#4caf50" }} />
            </ListItemIcon>
            <ListItemText primary="Today" />
          </ListItem>

          <ListItem>
            <ListItemIcon
              sx={{
                minWidth: { xs: "30px", sm: "40px" },
              }}
            >
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Important" />
          </ListItem>

          <ListItem>
            <ListItemIcon
              sx={{
                minWidth: { xs: "30px", sm: "40px" },
              }}
            >
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Planned" />
          </ListItem>
        </List>
      )}

      <Divider sx={{ marginY: 1 }} />

      {user.isAuthenticated && (
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "68%" },
            height: 120,
            marginTop: 1,
            backgroundColor: theme.palette.background.default,
            padding: 2,
            borderRadius: "10px",
          }}
        >
          {/* Background Circle */}
          <CircularProgress
            variant="determinate"
            value={pendingPercentage + finishedPercentage}
            size={120}
            thickness={4}
            sx={{ color: "#ff9800" }}
          />
        </Box>
      )}

          {/* Finished Tasks (30%) */}
          {user.isAuthenticated &&<Box
            sx={{
              marginTop: {xs: -17,sm:-17,md:-17},
              marginRight: {xs: -3,sm: 5,md: 7}, 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={finishedPercentage}
              size={120}
              thickness={4}
              sx={{
                color: "#4caf50",
                transform: "rotate(-90deg)", // Rotate to start from the top
              }}
            />
          </Box>}
      {/* Task Descriptions */}
      {user.isAuthenticated && (
        <Box sx={{ textAlign: "center", marginBlock: 2 }}>
          <Typography variant="body2" sx={{ color: "#4caf50" }}>
            Finished Tasks: {finishedTasks}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ff9800" }}>
            Pending Tasks: {pendingTasks}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
