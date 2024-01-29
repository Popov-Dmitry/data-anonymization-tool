import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { DatabaseConnectionData, useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DatabaseConnectionModal from "../modals/database-connection-modal/DatabaseConnectionModal";
import { useState } from "react";
import { useAxios } from "../../providers/axios-provider";

const menu = [
  {
    title: "Таблицы",
    route: "/tables"
  },
  {
    title: "Справка",
    route: "/help"
  }
];

export default function MenuAppBar() {
  const navigate = useNavigate();
  const {
    database,
    server,
    port,
    username,
    password,
    databaseName,
    isConnected,
    updateDatabaseConnectionData,
    setIsConnected
  } = useDatabaseConnection();
  const { api } = useAxios();
  const [showDatabaseConnectionModal, setShowDatabaseConnectionModal] = useState<boolean>(false);

  const onApply = async (values: DatabaseConnectionData) => {
    updateDatabaseConnectionData(values);
    try {
      await api.post("/settings", {
        url: `${values.database}://${values.server}:${values.port}`,
        nameDB: values.databaseName,
        user: values.username,
        password: values.password,
      });
      setIsConnected(true);
    } catch (e: any) {
      alert(e.message);
      console.log(e);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
        <AppBar position="static">
          <Toolbar>
            <AdminPanelSettingsIcon sx={{ mr: 1 }} />
            {menu.map((item) => (
              <Button
                key={item.title}
                onClick={() => navigate(item.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item.title}
              </Button>
            ))}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              onClick={() => setShowDatabaseConnectionModal(true)}
              color="inherit"
            >
              <SettingsRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <DatabaseConnectionModal
        value={{
          database,
          server,
          port,
          username,
          password,
          databaseName
        }}
        onApply={onApply}
        show={showDatabaseConnectionModal}
        onHide={() => setShowDatabaseConnectionModal(false)}
      />
    </>
  );
}