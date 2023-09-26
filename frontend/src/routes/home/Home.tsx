import "./Home.scss";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../../components/modals/database-connection-modal/DatabaseConnectionModal";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate } from "react-router-dom";

const baseClassName = "home-page";
const bem = bemElement(baseClassName);

const Home = () => {
  const navigate = useNavigate();
  const { isConnected } = useDatabaseConnection();
  const [showDatabaseConnectionModal, setShowDatabaseConnectionModal] = useState<boolean>(false);

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
        show={showDatabaseConnectionModal}
        onHide={() => setShowDatabaseConnectionModal(false)}
      />
    </div>
  );
};

export default Home;
