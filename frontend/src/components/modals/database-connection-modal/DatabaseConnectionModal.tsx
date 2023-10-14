import "./DatabaseConnectionModal.scss";
import React from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  Radio,
  RadioGroup,
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

interface IImportDataModalData {
  show: boolean;
  onHide: () => void;
  title?: string;
  value: DatabaseConnectionData;
  onApply?: (value: DatabaseConnectionData) => void;
  className?: string;
}

const DatabaseConnectionModal = ({
  show,
  onHide,
  title = "Подключение к базе данных",
  value,
  onApply,
  className = ""
}: IImportDataModalData) => {
  const databaseForm = useFormik({
    initialValues: {
      database: value.database,
      server: value.server,
      port: value.port,
      username: value.username,
      password: value.password,
      databaseName: value.databaseName
    },
    onSubmit: (values) => {
      onApply && onApply(values);
    }
  });

  const isFormEmpty =
    databaseForm.values.database.length === 0 ||
    databaseForm.values.server.length === 0 ||
    databaseForm.values.port.length === 0 ||
    databaseForm.values.username.length === 0 ||
    databaseForm.values.password.length === 0 ||
    databaseForm.values.databaseName.length === 0;

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
          <div>
            <Typography>Сервер</Typography>
            <Input
              style={{ width: "100%" }}
              name="server"
              value={databaseForm.values.server}
              onChange={databaseForm.handleChange}
            />
          </div>
          <div>
            <Typography>Порт</Typography>
            <Input
              style={{ width: "100%" }}
              name="port"
              value={databaseForm.values.port}
              onChange={databaseForm.handleChange}
            />
          </div>
          <div>
            <Typography>Имя пользователя</Typography>
            <Input
              style={{ width: "100%" }}
              name="username"
              value={databaseForm.values.username}
              onChange={databaseForm.handleChange}
            />
          </div>
          <div>
            <Typography>Пароль</Typography>
            <Input
              style={{ width: "100%" }}
              name="password"
              value={databaseForm.values.password}
              onChange={databaseForm.handleChange}
            />
          </div>
          <div>
            <Typography>Название базы данных</Typography>
            <Input
              style={{ width: "100%" }}
              name="databaseName"
              value={databaseForm.values.databaseName}
              onChange={databaseForm.handleChange}
            />
          </div>
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
