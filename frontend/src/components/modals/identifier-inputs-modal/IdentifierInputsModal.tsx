import "./IdentifierInputsModal.scss";
import React, { useState } from "react";
import { bemElement } from "../../../utils/bem-class-names";
import { joinClassNames } from "../../../utils/join-class-names";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import MultiSelect from "../../multi-select/MultiSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { IIdentifier } from "../../methods/Identifier";

const baseClassName = "identifier-inputs-modal";
const bem = bemElement(baseClassName);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

interface IIdentifierInputsModal {
  columns: string[]
  show: boolean;
  onHide: () => void;
  saveData: (data: IIdentifier[]) => void;
  className?: string;
}

const defaultValue = {
  newNameTable: "",
  namesColumn: []
};

const IdentifierInputsModal = ({ columns, show, onHide, saveData, className = "" }: IIdentifierInputsModal) => {
  const [data, setData] = useState<IIdentifier[]>([defaultValue]);

  const isFormValid = data.length > 0
    && data.filter((item) => item.namesColumn.length > 0 && item.newNameTable.length > 0).length === data.length;

  const _onHide = () => {
    if (isFormValid) {
      saveData(data);
    }
    onHide();
  };

  const onAddClick = () => {
    setData([ ...data, defaultValue ]);
  };

  const onDeleteClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={show}
      onClose={_onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h6">Введение идентификаторов</Typography>
        <div className={bem("content")}>
          {data.map((item, index) => (
            <div key={index} className={bem("row")}>
              <TextField
                variant="standard"
                label="Имя новой таблицы"
                type="text"
                className="flex-1"
                required
                value={item.newNameTable}
                onChange={(event) => setData(data.map((v, i) => i === index ? { ...item, newNameTable: event.target.value } : v))}
              />
              <MultiSelect
                options={columns.filter((column) => !data.some((value, i) => index !== i && value.namesColumn.some(((v) => v === column))))}
                placeholder="Выберете столбцы"
                fullWidth
                value={item.namesColumn}
                onChange={(value) => setData(data.map((v, i) => i === index ? { ...item, namesColumn: value } : v))}
              />
              <IconButton
                color="primary"
                onClick={() => onDeleteClick(index)}
              >
                <DeleteIcon color="action" />
              </IconButton>
            </div>
          ))}
        </div>
        <div className={bem("buttons")}>
          <Button
            variant="outlined"
            className="flex-1"
            onClick={onAddClick}
          >
            Добавить
          </Button>
          <Button
            variant="contained"
            className="flex-2"
            disabled={!isFormValid}
            onClick={_onHide}
          >
            Готово
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default IdentifierInputsModal;