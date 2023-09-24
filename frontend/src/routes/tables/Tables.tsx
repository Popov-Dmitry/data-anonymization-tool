import "./Tables.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { bemElement } from "../../utils/bem-class-names";

const baseClassName = "tables-page";
const bem = bemElement(baseClassName);

const tablesMock = [
  {
    name: "table 1"
  },
  {
    name: "table 2"
  },
  {
    name: "table 3"
  },
  {
    name: "table 4"
  },
  {
    name: "table 5"
  }
];

const Tables = () => {
  const navigate = useNavigate();
  const { isConnected } = useDatabaseConnection();

  if (!isConnected) {
    navigate("/");
  }

  return (
    <div className={baseClassName}>
      <Typography variant="h5" className={bem("title")}>
        Выберите таблицу
      </Typography>
      <List>
        {tablesMock.map((table) => (
          <ListItem>
            <ListItemButton onClick={() => navigate(`/tables/${table.name}`)}>
              <Typography>{table.name}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tables;
