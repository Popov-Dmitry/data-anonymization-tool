import "./GeneralizationValueInputsModal.scss";
import React, { useState } from "react";
import { joinClassNames } from "../../../utils/join-class-names";
import { Button, FormControlLabel, IconButton, Modal, Switch, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { bemElement } from "../../../utils/bem-class-names";
import DeleteIcon from '@mui/icons-material/Delete';
import { IGeneralizationValue } from "../../methods/GeneralizationValue";

const baseClassName = "generalization-value-inputs-modal";
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

interface IGeneralizationStringInputsModal {
  show: boolean;
  onHide: () => void;
  saveData: (data: IGeneralizationValue) => void;
  className?: string;
}

const GeneralizationValueInputsModal = ({
  show,
  onHide,
  saveData,
  className = ""
}: IGeneralizationStringInputsModal) => {
  const [generalizationTable, setGeneralizationTable] = useState<string>("");
  const [isDate, setIsDate] = useState<boolean>(false);
  const [generalizationName, setGeneralizationName] = useState<string[]>([""]);
  const [minValue, setMinValue] = useState<string[]>([""]);
  const [maxValue, setMaxValue] = useState<string[]>([""]);

  const isFormValid = generalizationName?.length === minValue?.length
    && generalizationName?.length === maxValue?.length
    && generalizationName?.length > 0
    && generalizationTable;

  const _onHide = () => {
    if (isFormValid) {
      saveData({
        generalizationTable,
        generalizationName,
        minValue,
        maxValue,
        isDate
      });
    }
    onHide();
  };

  const onAddClick = () => {
    setGeneralizationName([ ...generalizationName, "" ]);
    setMinValue([ ...minValue, "" ]);
    setMaxValue([ ...maxValue, "" ]);
  };

  const onDeleteClick = (index: number) => {
    setGeneralizationName(generalizationName.filter((_, i) => i !== index));
    setMinValue(minValue.filter((_, i) => i !== index));
    setMaxValue(maxValue.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={show}
      onClose={_onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h5">Обобщение значений</Typography>
        <div className={bem("inputs")}>
          <div className={joinClassNames(bem("inputs-header"), bem("row"))}>
            <TextField
              variant="standard"
              label="Имя новой таблицы"
              type="text"
              fullWidth
              required
              value={generalizationTable}
              onChange={(event) => setGeneralizationTable(event.target.value)}
            />
            <FormControlLabel
              control={<Switch
                checked={isDate}
                onChange={(event) => setIsDate(event.target.checked)}
              />}
              label="Даты"
            />
          </div>
          {generalizationName.map((name: string, index: number) => (
            <div className={bem("row")} key={name + index}>
              <TextField
                variant="outlined"
                label="Имя"
                type="text"
                fullWidth
                required
                inputProps={{style: {fontSize: 12}}}
                InputLabelProps={{style: {fontSize: 12}}}
                value={name}
                onChange={(event) => {
                  setGeneralizationName(generalizationName.map((n, i) =>
                    (i === index ? event.target.value : n)));
                }}
              />
              <TextField
                variant="outlined"
                label="Минимальное значение"
                type={isDate ? "date" : "number"}
                fullWidth
                required
                inputProps={{style: {fontSize: 12}}}
                InputLabelProps={{style: {fontSize: 12}}}
                value={minValue[index]}
                onChange={(event) => {
                  setMinValue(minValue.map((value, i) =>
                    (i === index ? event.target.value : value)));
                }}
              />
              <TextField
                variant="outlined"
                label="Максимальное значение"
                type={isDate ? "date" : "number"}
                fullWidth
                required
                inputProps={{style: {fontSize: 12}}}
                InputLabelProps={{style: {fontSize: 12}}}
                value={maxValue[index]}
                onChange={(event) => {
                  setMaxValue(maxValue.map((value, i) =>
                    (i === index ? event.target.value : value)));
                }}
              />
              <IconButton
                color="primary"
                onClick={() => onDeleteClick(index)}
              >
                <DeleteIcon color="action" />
              </IconButton>
            </div>
          ))}
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
        </div>
      </Box>
    </Modal>
  );
};

export default GeneralizationValueInputsModal;