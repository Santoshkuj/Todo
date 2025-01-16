import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";

const TaskProgress = ({ finishedPercentage, finishedTasks, pendingTasks })=> {
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    let size;
    if (isXs) size = 80;
    else if (isSm) size = 100;
    else if (isMd) size = 120;
    else size = 140; 

    return (
        <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginY: 2,
        paddingX: {xs:1,sm:4},
        paddingY: 2,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2
      }}
    >
      <Box position="relative">
        <CircularProgress
          variant="determinate"
          size={size}
          value={100}
          thickness={4}
          sx={{ color: "#ff9800" }}
        />
        <CircularProgress
          variant="determinate"
          size={size}
          value={finishedPercentage}
          thickness={4}
          sx={{
            color: "#4caf50",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
    </Box>
      </Box>
      <Typography variant="body2" sx={{ marginTop: {xs:3,sm:1},color: "#4caf50" }}>
        Finished Tasks: {finishedTasks}
      </Typography>
      <Typography variant="body2" sx={{ color: "#ff9800" }}>
        Pending Tasks: {pendingTasks}
      </Typography>
    </>
)};

  export default TaskProgress