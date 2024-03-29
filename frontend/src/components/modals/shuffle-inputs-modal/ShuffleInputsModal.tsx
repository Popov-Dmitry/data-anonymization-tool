import "./ShuffleInputsModal.scss";
import React, { useState } from "react";
import { bemElement } from "../../../utils/bem-class-names";
import { joinClassNames } from "../../../utils/join-class-names";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import MultiSelect from "../../multi-select/MultiSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAttributes } from "../../../providers/attributes-provider";

const baseClassName = "shuffle-inputs-modal";
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

interface IShuffleInputsModal {
  show: boolean;
  onHide: () => void;
  saveData: (data: string[][]) => void;
  className?: string;
}

const ShuffleInputsModal = ({ show, onHide, saveData, className = "" }: IShuffleInputsModal) => {
  const [data, setData] = useState<string[][]>([[]]);
  const { attributes } = useAttributes();

  const isFormValid = data.length > 0
    && data.filter((item) => item.length > 0).length === data.length;

  const onAddClick = () => {
    setData([ ...data, [] ]);
  };

  const onDeleteClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

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
        <Typography variant="h6">Перемешивание</Typography>
        <div className={bem("content")}>
          {data.map((item, index) => (
            <div key={index} className={bem("row")}>
              <MultiSelect
                options={attributes}
                placeholder="Выберете атрибуты"
                fullWidth
                value={item}
                onChange={(value) => setData(data.map((v, i) => i === index ? value : v))}
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

export default ShuffleInputsModal;