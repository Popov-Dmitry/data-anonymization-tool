import "./MicroAggregationInputsModal.scss";
import React, { useMemo, useState } from "react";
import { bemElement } from "../../../utils/bem-class-names";
import { joinClassNames } from "../../../utils/join-class-names";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import MultiSelect from "../../multi-select/MultiSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { IMicroAggregation } from "../../methods/MicroAggregation";
import { useAttributes } from "../../../providers/attributes-provider";
import { useAttributesTypes } from "../../../providers/attributes-types-provider";

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
  show: boolean;
  onHide: () => void;
  saveData: (data: IMicroAggregation[]) => void;
  className?: string;
}

const MicroAggregationInputsModal = ({ show, onHide, saveData, className = "" }: IMicroAggregationInputsModal) => {
  const { attributes } = useAttributes();
  const { attributesDataType } = useAttributesTypes();
  const validAttributes = useMemo(() =>
      attributes.filter((attribute) => {
        const type = attributesDataType.find((attributeType) => attributeType.name === attribute)?.dataType;
        return type === "decimal" || type === "integer"
      }),
    [attributes, attributesDataType]);
  const [kLevels, setKLevels] = useState<number[]>([1]);
  const [namesColumn, setNamesColumn] = useState<string[]>([]);

  const onAddRowClick = () => {
    setKLevels((prevState) => [...prevState, prevState[prevState.length - 1] + 1])
  };

  const onDeleteClick = (index: number) => {
    setKLevels(kLevels.filter((_, i) => i !== index));
  };

  const isFormValid = kLevels.length > 0
      && kLevels.filter(item => item > 0).length === kLevels.length
      && namesColumn.length > 0;

  const _onHide = () => {
    if (isFormValid) {
      saveData(kLevels.map((k) => ({
        k,
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
        <Typography variant="h6">Микроагрегация</Typography>
        <div className={bem("content")}>
          <MultiSelect
            options={validAttributes}
            value={namesColumn}
            placeholder="Выберете атрибуты"
            fullWidth
            onChange={(value) => setNamesColumn(value)}
          />
          <div className={bem("level")}>
            {kLevels.map((item: number, index: number) => (
              <div key={index} className={bem("row")}>
                <TextField
                  variant="standard"
                  label="Размер группы"
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

export default MicroAggregationInputsModal;