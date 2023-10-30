import "./GeneralizationStringInputsModal.scss";
import React, { useEffect, useState } from "react";
import { joinClassNames } from "../../../utils/join-class-names";
import { Button, Modal, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { bemElement } from "../../../utils/bem-class-names";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMethodsInputs } from "../../../providers/methods-inputs-provider";
import { IGeneralizationString } from "../../methods/GeneralizationString";

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
  const [data, setData] = useState<any>();
  const [newKey, setNewKey] = useState<string>();
  const [newValue, setNewValue] = useState<string>();

  const isFormValid = data && Object.keys(data) && generalizationTable;

  const _onHide = () => {
    if (isFormValid) {
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
          {data && Object.keys(data).map((key) => (
            <div className={bem("row")} key={key}>
              <TextField
                variant="outlined"
                label="Из"
                type="text"
                fullWidth
                defaultValue={key}
                onBlur={(event) => {
                  if (event.target.value !== key) {
                    const newObject = {};
                    delete Object.assign(newObject, data, { [event.target.value]: data[key] })[key];
                    setData(newObject);
                  }
                }}
              />
              <ArrowForwardIcon color="action" />
              <TextField
                variant="outlined"
                label="В"
                type="text"
                fullWidth
                defaultValue={data[key]}
                onBlur={(event) => {
                  const newData = { ...data };
                  newData.key = event.target.value;
                  setData(newData);
                }}
              />
            </div>
          ))}
          <div className={bem("row")}>
            <TextField
              variant="outlined"
              label="Из"
              type="text"
              fullWidth
              value={newKey}
              onChange={(event) => setNewKey(event.target.value)}
              onBlur={(event) => {
                if (newValue) {
                  const newData = { ...data };
                  newData[event.target.value] = newValue;
                  setData(newData);
                  setNewKey("");
                  setNewValue("");
                }
              }}
            />
            <ArrowForwardIcon color="action" />
            <TextField
              variant="outlined"
              label="В"
              type="text"
              fullWidth
              value={newValue}
              onChange={(event) => setNewValue(event.target.value)}
              onBlur={(event) => {
                if (newKey) {
                  const newData = { ...data };
                  newData[newKey] = event.target.value;
                  setData(newData);
                  setNewKey("");
                  setNewValue("");
                }
              }}
            />
          </div>
          <Button
            variant="contained"
            className={bem("button")}
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

export default GeneralizationStringInputsModal;