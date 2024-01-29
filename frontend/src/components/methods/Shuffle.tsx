import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import ShuffleInputsModal from "../modals/shuffle-inputs-modal/ShuffleInputsModal";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const Shuffle = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const [data, setData] = useState<string[][]>([]);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected && data.length > 0) {
      addData(data.map((value) => ({ method: "Shuffle", params: { namesColumn: value } })));
    }
  }, [addData, data, isTriggered, selected]);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <div className={joinClassNames(bem("approved"), "flex-2")}>
        <FormControlLabel
          control={<Switch
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
          />}
          label="Перемешивание"
        />
        <Tooltip title="Одобрено Роскомнадзором">
          <img src={require('../../assets/RKN.png')} alt="Одобрено Роскомнадзором" height={14} width={14} />
        </Tooltip>
      </div>
      {selected && (
        <Button
          className="flex-1"
          variant="outlined"
          size="small"
          onClick={() => setShowInputsModal(true)}
        >
          Редактировать
        </Button>
      )}
      <ShuffleInputsModal
        saveData={setData}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default Shuffle;