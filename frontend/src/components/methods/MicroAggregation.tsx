import React, { useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import MicroAggregationInputsModal from "../modals/micro-aggregation-inputs-modal/MicroAggregationInputsModal";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IMicroAggregationData {
  columns: string[];
}

const MicroAggregation = ({ columns }: IMicroAggregationData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);

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
        <>
          <Button
            className="flex-1"
            variant="outlined"
            size="small"
            onClick={() => setShowInputsModal(true)}
          >
            Редактировать
          </Button>
          {showInputsModal && (
            <MicroAggregationInputsModal
              columns={columns}
              show={showInputsModal}
              onHide={() => setShowInputsModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MicroAggregation;