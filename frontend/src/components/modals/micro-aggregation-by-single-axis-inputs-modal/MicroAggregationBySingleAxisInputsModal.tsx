import "./MicroAggregationBySingleAxisInputsModal.scss";
import React, { useState } from "react";
import { bemElement } from "../../../utils/bem-class-names";
import { joinClassNames } from "../../../utils/join-class-names";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Typography,
  InputLabel,
  Select, MenuItem
} from "@mui/material";
import MultiSelect from "../../multi-select/MultiSelect";
import DeleteIcon from "@mui/icons-material/Delete";

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

interface IMicroAggregationBySingleAxisInputsModal {
  columns: string[]
  show: boolean;
  onHide: () => void;
  className?: string;
}

interface IMicroAggregationBySingleAxis {
  axisColumn: string;
  k: number;
  columns: string[];
}

const defaultSettings: IMicroAggregationBySingleAxis = {
  axisColumn: "",
  k: 1,
  columns: []
};

const MicroAggregationBySingleAxisInputsModal = ({ columns, show, onHide, className = "" }: IMicroAggregationBySingleAxisInputsModal) => {
  const [data, setData] = useState<IMicroAggregationBySingleAxis[]>([defaultSettings]);

  const onAddClick = () => {
    setData([ ...data, defaultSettings ]);
  };

  const onDeleteClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const isFormValid = data.length > 0
    && data.filter((item) => item.k > 0 && item.columns.length > 0).length === data.length;

  return (
    <Modal
      open={show}
      onClose={onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h6">Микроагрегация по одной оси</Typography>
        <div className={bem("content")}>
          {data.map((item, index) => (
            <div key={index} className={bem("column")}>
              <div className={bem("row")}>
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
                <FormControl sx={{width: 350}}>
                  <InputLabel id="demo-simple-select-label">Осевой столбец</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.axisColumn}
                    label="Осевой столбец"
                    onChange={(value) => {
                      setData(data.map((v, i) =>
                        (i === index ? { ...v, axisColumn: value.target.value } : v)))
                    }}
                  >
                    {columns.map((column: string) => (
                      <MenuItem key={column} value={column}>{column}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <MultiSelect
                  options={columns}
                  value={item.columns}
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
            // TODO
            onClick={onHide}
          >
            Готово
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default MicroAggregationBySingleAxisInputsModal;