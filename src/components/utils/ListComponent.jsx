import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";

const ListComponent = ({ items }) => {
  const theme = useTheme()
  return (
    <List
      dense
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: "10px",
        width: { xs: "90%", sm: "80%" },
      }}
    >
      {items.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "unset" },
          }}
        >
          <ListItemIcon>
            {React.cloneElement(item.icon, {
              sx: { fontSize: { xs: "40px", sm: "24px" }, ...item.iconStyles },
            })}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{ display: { xs: "none", sm: "block" } }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
