import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import MicroAggregationInputsModal from "../modals/micro-aggregation-inputs-modal/MicroAggregationInputsModal";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IMicroAggregationData {
  columns: string[];
}

export interface IMicroAggregation {
  namesColumn: string[];
  k: number;
}

const MicroAggregation = ({ columns }: IMicroAggregationData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);
  const [data, setData] = useState<IMicroAggregation[]>([]);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected && data.length > 0) {
      addData(data.map((value) => ({ method: "MicroAggregation", params: value })));
    }
  }, [addData, data, isTriggered, selected]);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Микроагрегация"
        className="flex-2"
      />
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
      <MicroAggregationInputsModal
        columns={columns}
        saveData={setData}
        show={showInputsModal}
        onHide={() => setShowInputsModal(false)}
      />
    </div>
  );
};

export default MicroAggregation;