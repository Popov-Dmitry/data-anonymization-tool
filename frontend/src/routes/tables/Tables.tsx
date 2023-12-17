import "./Tables.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { bemElement } from "../../utils/bem-class-names";
import { Helmet } from "react-helmet";
import { useAxios } from "../../providers/axios-provider";

const baseClassName = "tables-page";
const bem = bemElement(baseClassName);

const Tables = () => {
  const navigate = useNavigate();
  const { isConnected } = useDatabaseConnection();
  const { api } = useAxios();
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/tables");
        setTables(response.data);
      } catch (e: any) {
        alert(e.message);
        console.log(e);
      }
    })();
  }, [api]);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  return (
    <>
      <Helmet>
        <title>Таблицы</title>
        <meta property="og:title" content="Таблицы" />
      </Helmet>
      <div className={baseClassName}>
        <Typography variant="h5" className={bem("title")}>
          Выберите таблицу
        </Typography>
        <List>
          {tables.map((table: string) => (
            <ListItem>
              <ListItemButton onClick={() => navigate(`/tables/${table}`)}>
                <Typography>{table}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default Tables;
