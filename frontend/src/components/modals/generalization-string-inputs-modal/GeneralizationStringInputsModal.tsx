import "./GeneralizationStringInputsModal.scss";
import React, { useState } from "react";
import { joinClassNames } from "../../../utils/join-class-names";
import { Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { bemElement } from "../../../utils/bem-class-names";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IGeneralizationString } from "../../methods/GeneralizationString";
import DeleteIcon from "@mui/icons-material/Delete";

const baseClassName = "generalization-string-inputs-modal";
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
  saveData: (data: IGeneralizationString) => void;
  className?: string;
}

const GeneralizationStringInputsModal = ({
  show,
  onHide,
  saveData,
  className = ""
}: IGeneralizationStringInputsModal) => {
  const [generalizationTable, setGeneralizationTable] = useState<string>("");
  const [keys, setKeys] = useState<string[][]>([[""]]);
  const [values, setValues] = useState<string[][]>([[""]]);

  const onAddRowClick = () => {
    setKeys(keys.map((key: string[], index: number) =>
      (index === keys.length - 1 ? [...key, ""] : key)
    ));
    setValues(values.map((value: string[], index: number) =>
      (index === values.length - 1 ? [...value, ""] : value)
    ));
  };

  const onAddLevelClick = () => {
    setKeys([...keys, [""]]);
    setValues([...values, [""]]);
  };

  const onDeleteClick = (levelIndex: number, index: number) => {
    setKeys(keys[levelIndex].length === 1
      ? keys.filter((_, i) => i !== levelIndex)
      : keys.map((value, li) => li === levelIndex ? value.filter((_, i) => i !== index) : value)
    );
    setValues(values[levelIndex].length === 1
      ? values.filter((_, i) => i !== levelIndex)
      : values.map((value, li) => li === levelIndex ? value.filter((_, i) => i !== index) : value)
    );
  };

  const isFormValid = keys?.length === values?.length
    && keys?.length > 0
    && generalizationTable;

  const _onHide = () => {
    if (isFormValid) {
      const data: any[] = [];
      for (let i = 0; i < keys.length; i++) {
        data[i] = {};
        for (let j = 0; j < keys[i].length; j++) {
          data[i][keys[i][j]] = values[i][j];
        }
      }
      saveData({
        generalizationTable,
        value: data
      });
    }
    onHide();
  };

  return (
    <Modal
      open={show}
      onClose={_onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h5">Обобщение строк</Typography>
        <div className={bem("inputs")}>
          <div className={bem("inputs-header")}>
            <TextField
              variant="standard"
              label="Имя новой таблицы"
              type="text"
              fullWidth
              required
              value={generalizationTable}
              onChange={(event) => setGeneralizationTable(event.target.value)}
            />
          </div>
          {keys.map((level, levelIndex) => (
            <div key={levelIndex}>
              <div className={bem("level")}>
                {level.map((key, index) => (
                  <div className={bem("row")} key={key}>
                    <TextField
                      variant="outlined"
                      label="Из"
                      type="text"
                      fullWidth
                      defaultValue={key}
                      onChange={(event) => {
                        setKeys(keys.map((l, i) =>
                          (i === levelIndex ? l.map((n, i) => (i === index ? event.target.value : n)) : l)));
                      }}
                    />
                    <ArrowForwardIcon color="action" />
                    <TextField
                      variant="outlined"
                      label="В"
                      type="text"
                      fullWidth
                      defaultValue={values[levelIndex][index]}
                      onChange={(event) => {
                        setValues(keys.map((l, i) =>
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

export default GeneralizationStringInputsModal;