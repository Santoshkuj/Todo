import { Checkbox, Button, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { deleteTodo, updateCompletion } from "../../redux/todo/todoSlice";

const TodoItem = ({ task, viewMode }) => {
  const dispatch = useDispatch();

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCompletionChange = (id, isFinished) => {
    dispatch(updateCompletion({ id, isFinished }));
  };

  const stars = Array.from(
    {
      length: task.priority === "High" ? 3 : task.priority === "Medium" ? 2 : 1,
    },
    (_, index) => <StarIcon key={index} color="primary" fontSize="small" />
  );

  if (viewMode !== "list" && !task.isFinished) {
    // Render small card for unfinished tasks
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: { xs: "145px", sm: "160px" },
          padding: { xs: "4px", sm: "6px" },
          marginLeft: { sm: "4px", md: "8px" },
          borderRadius: "10px",
          borderBottom: "1px solid #919da3",
          boxShadow: "0 0 2px 0 #919da3",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 1,
          }}
        >
          <Checkbox
            checked={task.isFinished}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "1rem", sm: "1.2rem" },
              },
            }}
            onChange={(e) => handleCompletionChange(task.id, e.target.checked)}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: { sx: 300, sm: 400 },
              fontSize: { xs: "14px", sm: "16px" },
              lineHeight: { xs: 1.2, sm: 1.3 },
            }}
          >
            {task.task}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{stars}</div>
          <Button
            onClick={() => handleDeleteTodo(task.id)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              marginTop: { xs: "6px", sm: "8px" },
              paddingX: { xs: "0px", sm: "8px"},
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    );
  }

  // Default list layout for other cases
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          height: task.isFinished ? "20px" : "30px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.isFinished}
            size="small"
            onChange={(e) => handleCompletionChange(task.id, e.target.checked)}
          />
          <span
            style={{
              marginLeft: "10px",
              textDecoration: task.isFinished ? "line-through" : "none",
            }}
          >
            {task.task}
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <div>{stars}</div>
          <Button
            onClick={() => handleDeleteTodo(task.id)}
            variant="outlined"
            color="error"
            sx={{ paddingY: "1px",
            paddingX: { xs: "0px", sm: "12px"},
            fontSize:{xs:'12px',sm:'14px'} }}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <hr
        style={{
          border: "none",
          height: "2px",
          backgroundColor: "#D3D3D3",
        }}
      />
    </>
  );
};

export default TodoItem;
