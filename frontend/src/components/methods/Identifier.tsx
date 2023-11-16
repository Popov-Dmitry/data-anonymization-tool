import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { joinClassNames } from "../../utils/join-class-names";
import { bemElement } from "../../utils/bem-class-names";
import IdentifierInputsModal from "../modals/identifier-inputs-modal/IdentifierInputsModal";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IIdentifierData {
  columns: string[];
}

export interface IIdentifier {
  namesColumn: string[];
  newNameTable: string;
}

const Identifier = ({ columns }: IIdentifierData) => {
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
          sx={{
            "& .MuiFormControlLabel-label": {
              width: "100px"
            }
          }}
        />
        <Tooltip title="Одобрено Роскомнадзором" className="self-start mt-4px">
          <img src={require('../../assets/RKN.png')} height={14} width={14} />
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
        columns={columns}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default Identifier;