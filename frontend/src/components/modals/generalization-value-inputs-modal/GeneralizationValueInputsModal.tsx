import "./GeneralizationValueInputsModal.scss";
import React, { useState } from "react";
import { joinClassNames } from "../../../utils/join-class-names";
import { Button, FormControlLabel, IconButton, Modal, Switch, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { bemElement } from "../../../utils/bem-class-names";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [generalizationName, setGeneralizationName] = useState<string[][]>([[""]]);
  const [minValue, setMinValue] = useState<string[][]>([[""]]);
  const [maxValue, setMaxValue] = useState<string[][]>([[""]]);

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

  const onAddRowClick = () => {
    setGeneralizationName(generalizationName.map((value: string[], index: number) =>
      (index === generalizationName.length - 1 ? [...value, ""] : value)
    ));
    setMinValue(minValue.map((value: string[], index: number) =>
      (index === minValue.length - 1 ? [...value, ""] : value)
    ));
    setMaxValue(maxValue.map((value: string[], index: number) =>
      (index === maxValue.length - 1 ? [...value, ""] : value)
    ));
  };

  const onAddLevelClick = () => {
    setGeneralizationName([...generalizationName, [""]]);
    setMinValue([...minValue, [""]]);
    setMaxValue([...maxValue, [""]]);
  };

  const onDeleteClick = (levelIndex: number, index: number) => {
    setGeneralizationName(generalizationName[levelIndex].length === 1
      ? generalizationName.filter((_, i) => i !== levelIndex)
      : generalizationName.map((value, li) => li === levelIndex ? value.filter((_, i) => i !== index) : value)
    );
    setMinValue(minValue[levelIndex].length === 1
      ? minValue.filter((_, i) => i !== levelIndex)
      : minValue.map((value, li) => li === levelIndex ? value.filter((_, i) => i !== index) : value)
    );
    setMaxValue(maxValue[levelIndex].length === 1
      ? maxValue.filter((_, i) => i !== levelIndex)
      : maxValue.map((value, li) => li === levelIndex ? value.filter((_, i) => i !== index) : value)
    );
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
          {generalizationName.map((level: string[], levelIndex: number) => (
            <div key={levelIndex}>
              <div className={bem("level")}>
                {level.map((name: string, index: number) => (
                  <div className={bem("row")} key={name + index}>
                    <TextField
                      variant="outlined"
                      label="Имя"
                      type="text"
                      fullWidth
                      required
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      value={name}
                      onChange={(event) => {
                        setGeneralizationName(generalizationName.map((l, i) =>
                          (i === levelIndex ? l.map((n, i) => (i === index ? event.target.value : n)) : l)));
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Минимальное значение"
                      type={isDate ? "date" : "number"}
                      fullWidth
                      required
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      value={minValue[levelIndex][index]}
                      onChange={(event) => {
                        setMinValue(minValue.map((l, i) =>
                          (i === levelIndex ? l.map((n, i) => (i === index ? event.target.value : n)) : l)));
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Максимальное значение"
                      type={isDate ? "date" : "number"}
                      fullWidth
                      required
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      value={maxValue[levelIndex][index]}
                      onChange={(event) => {
                        setMaxValue(maxValue.map((l, i) =>
                          (i === levelIndex ? l.map((n, i) => (i === index ? event.target.value : n)) : l)));
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => onDeleteClick(levelIndex, index)}
                    >
                      <DeleteIcon color="action" />
                    </IconButton>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
          <div className={bem("buttons")}>
            <div className={bem("buttons-left")}>
              <Button
                variant="outlined"
                className="flex-1"
                onClick={onAddRowClick}
              >
                Добавить строку
              </Button>
              <Button
                variant="outlined"
                className="flex-1"
                onClick={onAddLevelClick}
              >
                Новый уровень
              </Button>
            </div>

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