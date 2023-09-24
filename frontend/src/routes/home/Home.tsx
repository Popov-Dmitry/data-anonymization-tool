import "./Home.scss";
import React, {useState} from 'react';
import {Button} from "@mui/material";
import {bemElement} from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../../components/modals/database-connection-modal/DatabaseConnectionModal";

const baseClassName = "home-page";
const bem = bemElement(baseClassName);

const Home = () => {
  const [showImportDataModal, setShowImportDataModal] = useState<boolean>(false);

  return (
    <div className={baseClassName}>
      <div className={bem("empty")}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowImportDataModal(true)}
        >
          Подключиться к базе данных
        </Button>
      </div>
      <DatabaseConnectionModal
        show={showImportDataModal}
        onHide={() => setShowImportDataModal(false)}
      />
    </div>
  );
};

export default Home;