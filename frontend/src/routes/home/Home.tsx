import "./Home.scss";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../../components/modals/database-connection-modal/DatabaseConnectionModal";
import { DatabaseConnectionData, useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAxios } from "../../providers/axios-provider";

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
  const { api } = useAxios();
  const [showDatabaseConnectionModal, setShowDatabaseConnectionModal] = useState<boolean>(false);

  const onApply = async (values: DatabaseConnectionData) => {
    updateDatabaseConnectionData(values);
    try {
      await api.post("/settings", {
        url: `jdbc:${values.database}://${values.server}:${values.port}/`,
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

  if (isConnected) {
    navigate("/tables");
  }

  return (
    <>
      <Helmet>
        <title>Подключение</title>
        <meta property="og:title" content="Подключение" />
      </Helmet>
      <div className={baseClassName}>
        <div className={bem("empty")}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowDatabaseConnectionModal(true)}
          >
            Подключиться к базе данных
          </Button>
          <Button
            variant="contained"
            size="large"
            disabled
          >
            Загрузить файл .csv
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
    </>
  );
};

export default Home;
