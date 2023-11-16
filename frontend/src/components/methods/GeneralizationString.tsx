import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import GeneralizationStringInputsModal
  from "../modals/generalization-string-inputs-modal/GeneralizationStringInputsModal";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IGeneralizationStringData {
  column: string;
}

export interface IGeneralizationString {
  generalizationTable: string;
  value: any;
}

const GeneralizationString = ({ column }: IGeneralizationStringData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const [data, setData] = useState<IGeneralizationString | undefined>(undefined);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected && data) {
      addData([{
        method: "GeneralizationString",
        params: {
          nameColumn: column,
          generalizationTable: data.generalizationTable,
          value: data.value
        }
      }]);
    }
  }, [addData, column, data, isTriggered, selected]);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <div className={joinClassNames(bem("approved"), "flex-2")}>
        <FormControlLabel
          control={<Switch
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
          />}
          label="Обобщение строк"
        />
        <Tooltip title="Одобрено Роскомнадзором">
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
      <GeneralizationStringInputsModal
        saveData={setData}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default GeneralizationString;