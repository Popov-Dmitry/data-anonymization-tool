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
import { useAttributes } from "../../../providers/attributes-provider";

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
  show: boolean;
  onHide: () => void;
  saveData: (data: IMicroAggregationBySingleAxis[]) => void;
  className?: string;
}

const MicroAggregationBySingleAxisInputsModal = ({
  show,
  onHide,
  saveData,
  className = ""
}: IMicroAggregationBySingleAxisInputsModal) => {
  const { attributes } = useAttributes();
  const [kLevels, setKLevels] = useState<number[]>([1]);
  const [namesColumn, setNamesColumn] = useState<string[]>([]);
  const [axisColumn, setAxisColumn] = useState<string>("");

  const onAddRowClick = () => {
    setKLevels((prevState) => [...prevState, prevState[prevState.length - 1] + 1])
  };

  const onDeleteClick = (index: number) => {
    setKLevels(kLevels.filter((_, i) => i !== index));
  };

  const isFormValid = kLevels.length > 0
    && kLevels.filter(item => item > 0).length === kLevels.length
    && namesColumn.length > 0
    && axisColumn;

  const _onHide = () => {
    if (isFormValid) {
      saveData(kLevels.map((k) => ({
        k,
        axisColumn,
        namesColumn
      })));
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
          <div className={bem("row")}>
            <FormControl sx={{ width: 350 }}>
              <InputLabel id="demo-simple-select-label">Осевой столбец</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={axisColumn}
                label="Осевой столбец"
                onChange={(event) => setAxisColumn(event.target.value)}
              >
                {attributes.map((column: string) => (
                  <MenuItem key={column} value={column}>{column}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <MultiSelect
              options={attributes}
              value={namesColumn}
              placeholder="Выберете атрибуты"
              fullWidth
              onChange={(value) => setNamesColumn(value)}
            />
          </div>
          <div className={bem("level")}>
            {kLevels.map((item: number, index: number) => (
              <div key={index} className={bem("column")}>
                <div className={bem("row")}>
                  <TextField
                    variant="standard"
                    label="k"
                    type="number"
                    required
                    fullWidth
                    value={item}
                    onChange={(event) => {
                      setKLevels(kLevels.map((v, i) => (i === index ? parseInt(event.target.value) : v)));
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
        </div>
        <div className={bem("buttons")}>
          <div className={bem("buttons-left")}>
            <Button
              variant="outlined"
              className="flex-1"
              onClick={onAddRowClick}
            >
              Добавить уровень
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