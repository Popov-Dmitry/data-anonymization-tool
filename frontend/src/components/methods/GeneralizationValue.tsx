import React, { useEffect, useState } from "react";
import { joinClassNames } from "../../utils/join-class-names";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import GeneralizationValueInputsModal from "../modals/generalization-value-inputs-modal/GeneralizationValueInputsModal";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IGeneralizationStringData {
  column: string;
}

export interface IGeneralizationValue {
  generalizationTable: string;
  generalizationName: string[];
  minValue: string[];
  maxValue: string[];
  isDate: boolean
}

const GeneralizationValue = ({ column }: IGeneralizationStringData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const [data, setData] = useState<IGeneralizationValue | undefined>(undefined);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected && data) {
      addData([{
        method: "GeneralizationValue",
        params: {
          nameColumn: column,
          generalizationTable: data.generalizationTable,
          generalizationName: data.generalizationName,
          minValue: data.minValue,
          maxValue: data.maxValue,
          isDate: data.isDate
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
          label="Обобщение значений"
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
      <GeneralizationValueInputsModal
        saveData={setData}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default GeneralizationValue;