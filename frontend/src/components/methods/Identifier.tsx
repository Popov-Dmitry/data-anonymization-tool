import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { joinClassNames } from "../../utils/join-class-names";
import { bemElement } from "../../utils/bem-class-names";
import IdentifierInputsModal from "../modals/identifier-inputs-modal/IdentifierInputsModal";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

export interface IIdentifier {
  namesColumn: string[];
  newNameTable: string;
}

const Identifier = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const [data, setData] = useState<IIdentifier[]>([]);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected && data.length > 0) {
      addData(data.map((value) => ({ method: "Identifier", params: value  })));
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
          label="Введение идентификаторов"
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
      <IdentifierInputsModal
        saveData={setData}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default Identifier;