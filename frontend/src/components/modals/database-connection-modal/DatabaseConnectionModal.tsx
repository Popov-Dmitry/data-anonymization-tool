import "./DatabaseConnectionModal.scss";
import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Radio,
  RadioGroup, TextField,
  Typography
} from "@mui/material";
import { bemElement } from "../../../utils/bem-class-names";
import { useFormik } from "formik";
import { joinClassNames } from "../../../utils/join-class-names";
import { DatabaseConnectionData } from "../../../providers/database-connection-provider";

const baseClassName = "database-connection-modal";
const bem = bemElement(baseClassName);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

interface IDatabaseConnectionModalData {
  show: boolean;
  onHide: () => void;
  title?: string;
  value: DatabaseConnectionData;
  onApply?: (value: DatabaseConnectionData, nameNewTable?: string) => void;
  withTable?: boolean;
  className?: string;
}

const DatabaseConnectionModal = ({
  show,
  onHide,
  title = "Подключение к базе данных",
  value,
  onApply,
  withTable,
  className = ""
}: IDatabaseConnectionModalData) => {
  const databaseForm = useFormik({
    initialValues: {
      database: value.database,
      server: value.server,
      port: value.port,
      username: value.username,
      password: value.password,
      databaseName: value.databaseName,
    },
    onSubmit: (values) => {
      onApply && onApply(values);
    }
  });
  const [nameNewTable, setNameNewTable] = useState<string>("");

  const isFormEmpty =
    databaseForm.values.database.length === 0 ||
    databaseForm.values.server.length === 0 ||
    databaseForm.values.port.length === 0 ||
    databaseForm.values.username.length === 0 ||
    databaseForm.values.password.length === 0 ||
    databaseForm.values.databaseName.length === 0 ||
    (withTable && nameNewTable.length === 0);

  return (
    <Modal
      open={show}
      onClose={onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h6">{title}</Typography>
        <RadioGroup row className={bem("database")}>
          <div className={bem("radio")}>
            <Radio onClick={() => databaseForm.setFieldValue("database", "postgresql")} />
            <Typography>PostgreSQL</Typography>
          </div>
        </RadioGroup>
        <div className={bem("fields")}>
          <TextField
            variant="standard"
            label="Сервер"
            type="text"
            fullWidth
            name="server"
            value={databaseForm.values.server}
            onChange={databaseForm.handleChange}
          />
          <TextField
            className={bem("port")}
            variant="standard"
            label="Порт"
            type="number"
            fullWidth
            name="port"
            value={databaseForm.values.port}
            onChange={databaseForm.handleChange}
          />
          <TextField
            variant="standard"
            label="Имя пользователя"
            type="text"
            fullWidth
            name="username"
            value={databaseForm.values.username}
            onChange={databaseForm.handleChange}
          />
          <TextField
            variant="standard"
            label="Пароль"
            type="password"
            fullWidth
            name="password"
            value={databaseForm.values.password}
            onChange={databaseForm.handleChange}
          />
          <TextField
            variant="standard"
            label="Название базы данных"
            type="text"
            fullWidth
            name="databaseName"
            value={databaseForm.values.databaseName}
            onChange={databaseForm.handleChange}
          />
          {withTable && (
            <TextField
              variant="standard"
              label="Имя новой таблицы"
              type="text"
              fullWidth
              value={nameNewTable}
              onChange={(event) => setNameNewTable(event.target.value)}
            />
          )}
        </div>
        <div className={bem("buttons")}>
          <Button variant="outlined" color="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button
            variant="contained"
            sx={{ width: 200 }}
            disabled={isFormEmpty}
            // TODO
            onClick={databaseForm.submitForm}
          >
            Готово
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DatabaseConnectionModal;
