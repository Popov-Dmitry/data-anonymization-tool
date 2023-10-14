import "./Home.scss";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../../components/modals/database-connection-modal/DatabaseConnectionModal";
import { DatabaseConnectionData, useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate } from "react-router-dom";

const baseClassName = "home-page";
const bem = bemElement(baseClassName);

const Home = () => {
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
  const [showDatabaseConnectionModal, setShowDatabaseConnectionModal] = useState<boolean>(false);

  const onApply = (values: DatabaseConnectionData) => {
    updateDatabaseConnectionData(values);
    setIsConnected(true);
  };

  if (isConnected) {
    navigate("/tables");
  }

  return (
    <div className={baseClassName}>
      <div className={bem("empty")}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowDatabaseConnectionModal(true)}
        >
          Подключиться к базе данных
        </Button>
      </div>
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
    </div>
  );
};

export default Home;
