import React, { useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../modals/database-connection-modal/DatabaseConnectionModal";
import { joinClassNames } from "../../utils/join-class-names";
import { useFormik } from "formik";
import { useDatabaseConnection } from "../../providers/database-connection-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const Decomposition = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const {
    database,
    server,
    port,
    username,
    password,
    databaseName
  } = useDatabaseConnection();
  const databaseForm = useFormik({
    initialValues: {
      database,
      server,
      port,
      username,
      password,
      databaseName
    },
    onSubmit: (values) => {
      //TODO
    }
  });

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Декомпозиция"
        className="flex-2"
      />
      {selected && (
        <>
          <Button
            className="flex-1"
            variant="outlined"
            size="small"
            onClick={() => setShowInputsModal(true)}
          >
            Редактировать
          </Button>
          {showInputsModal && (
            <DatabaseConnectionModal
              title="Декомпозиция"
              value={databaseForm.values}
              onApply={databaseForm.handleChange}
              show={showInputsModal}
              onHide={() => setShowInputsModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Decomposition;