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
import { IMicroAggregationBySingleAxis } from "../../methods/MicroAggregationBySingleAxis";

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
  columns: string[];
  show: boolean;
  onHide: () => void;
  saveData: (data: IMicroAggregationBySingleAxis[][]) => void;
  className?: string;
}

const defaultSettings: IMicroAggregationBySingleAxis = {
  axisColumn: "",
  k: 1,
  namesColumn: []
};

const MicroAggregationBySingleAxisInputsModal = ({
  columns,
  show,
  onHide,
  saveData,
  className = ""
}: IMicroAggregationBySingleAxisInputsModal) => {
  const [data, setData] = useState<IMicroAggregationBySingleAxis[][]>([[defaultSettings]]);

  const onAddRowClick = () => {
    setData(data.map((value: IMicroAggregationBySingleAxis[], index: number) =>
      (index === data.length - 1 ? [...value, defaultSettings] : value)
    ));
  };

  const onAddLevelClick = () => {
    setData([...data, [defaultSettings]]);
  };

  const onDeleteClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const isFormValid = data.length > 0
    && data.filter((item) => item.filter(item => item.k > 0 && item.namesColumn.length > 0)).length === data.length;

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
        <Typography variant="h6">Микроагрегация по одной оси</Typography>
        <div className={bem("content")}>
          {data.map((level: IMicroAggregationBySingleAxis[], levelIndex: number) => (
            <div key={levelIndex}>
              <div className={bem("level")}>
                {level.map((item: IMicroAggregationBySingleAxis, index: number) => (
                  <div key={index} className={bem("column")}>
                    <div className={bem("row")}>
                      <TextField
                        variant="standard"
                        label="k"
                        type="number"
                        required
                        value={item.k}
                        onChange={(event) => {
                          setData(data.map((l, i) =>
                            (i === levelIndex ? l.map((v, i) => (i === index ? { ...v, k: parseInt(event.target.value) } : v)) : l)));
                        }}
                        sx={{ width: 50 }}
                      />
                      <FormControl sx={{ width: 350 }}>
                        <InputLabel id="demo-simple-select-label">Осевой столбец</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.axisColumn}
                          label="Осевой столбец"
                          onChange={(event) => {
                            setData(data.map((l, i) =>
                              (i === levelIndex ? l.map((v, i) => (i === index ? { ...v, axisColumn: event.target.value } : v)) : l)));
                          }}
                        >
                          {columns.map((column: string) => (
                            <MenuItem key={column} value={column}>{column}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <MultiSelect
                        options={columns}
                        value={item.namesColumn}
                        placeholder="Выберете столбцы"
                        fullWidth
                        onChange={(value) => {
                          setData(data.map((l, i) =>
                            (i === levelIndex ? l.map((v, i) => (i === index ? { ...v, namesColumn: value } : v)) : l)));
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
              <hr />
            </div>
          ))}
        </div>
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
      </Box>
    </Modal>
  );
};

export default MicroAggregationBySingleAxisInputsModal;