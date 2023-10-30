import "./MicroAggregationInputsModal.scss";
import React, { useState } from "react";
import { bemElement } from "../../../utils/bem-class-names";
import { joinClassNames } from "../../../utils/join-class-names";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import MultiSelect from "../../multi-select/MultiSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { IMicroAggregation } from "../../methods/MicroAggregation";

const baseClassName = "micro-aggregation-inputs-modal";
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

interface IMicroAggregationInputsModal {
  columns: string[]
  show: boolean;
  onHide: () => void;
  saveData: (data: IMicroAggregation[]) => void;
  className?: string;
}

const defaultSettings: IMicroAggregation = {
  k: 1,
  namesColumn: []
};

const MicroAggregationInputsModal = ({ columns, show, onHide, saveData, className = "" }: IMicroAggregationInputsModal) => {
  const [data, setData] = useState<IMicroAggregation[]>([defaultSettings]);

  const onAddClick = () => {
    setData([ ...data, defaultSettings ]);
  };

  const onDeleteClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const isFormValid = data.length > 0
    && data.filter((item) => item.k > 0 && item.namesColumn.length > 0).length === data.length;

  const _onHide = () => {
    if (isFormValid) {
      saveData(data);
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
        <Typography variant="h6">Микроагрегация</Typography>
        <div className={bem("content")}>
          {data.map((item, index) => (
            <div key={index} className={bem("row")}>
              <TextField
                variant="standard"
                label="k"
                type="number"
                required
                value={item.k}
                onChange={(event) => {
                  setData(data.map((v, i) =>
                    (i === index ? { ...v, k: parseInt(event.target.value) } : v)))
                }}
                sx={{width: 50}}
              />
              <MultiSelect
                options={columns}
                value={item.namesColumn}
                placeholder="Выберете столбцы"
                fullWidth
                onChange={(value) => {
                  setData(data.map((v, i) =>
                    (i === index ? { ...v, columns: value } : v)))
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

export default MicroAggregationInputsModal;