import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DatabaseConnectionModal from "../modals/database-connection-modal/DatabaseConnectionModal";
import { useState } from "react";

const menu = [
  {
    title: "Таблицы",
    route: "/tables"
  },
  {
    title: "Методы",
    route: "/methods"
  }
];

export default function MenuAppBar() {
  const navigate = useNavigate();
  const { isConnected } = useDatabaseConnection();
  const [showDatabaseConnectionModal, setShowDatabaseConnectionModal] = useState<boolean>(false);

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
        show={showDatabaseConnectionModal}
        onHide={() => setShowDatabaseConnectionModal(false)}
      />
    </>
  );
}