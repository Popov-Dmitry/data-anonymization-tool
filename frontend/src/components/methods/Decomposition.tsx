import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import DatabaseConnectionModal from "../modals/database-connection-modal/DatabaseConnectionModal";
import { joinClassNames } from "../../utils/join-class-names";
import { DatabaseConnectionData, useDatabaseConnection } from "../../providers/database-connection-provider";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IDecompositionData {
  column: string;
}

const Decomposition = ({ column }: IDecompositionData) => {
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
  const [data, setData] = useState<DatabaseConnectionData>({
    database,
    server,
    port,
    username,
    password,
    databaseName
  });
  const [nameNewTable, setNameNewTable] = useState<string>("");
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "Decomposition",
        params: {
          nameColumn: column,
          nameNewTable,
          url: `jdbc:${data.database}://${data.server}:${data.port}/`,
          nameDB: data.databaseName,
          user: data.username,
          password: data.password
        }
      }]);
    }
  }, [addData, column, data.database, data.databaseName, data.password, data.port, data.server, data.username, isTriggered, nameNewTable, selected]);

  const onApply = (values: DatabaseConnectionData, nameNewTable?: string) => {
    setData(values);
    setNameNewTable(nameNewTable || "")
    setShowInputsModal(false);
  };

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
        <Button
          className="flex-1"
          variant="outlined"
          size="small"
          onClick={() => setShowInputsModal(true)}
        >
          Редактировать
        </Button>
      )}
      <DatabaseConnectionModal
        title="Декомпозиция"
        value={data}
        withTable
        onApply={onApply}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default Decomposition;