import React, { useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import MicroAggregationBySingleAxisInputsModal
  from "../modals/micro-aggregation-by-single-axis-inputs-modal/MicroAggregationBySingleAxisInputsModal";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IMicroAggregationData {
  columns: string[];
}

const MicroAggregationBySingleAxis = ({ columns }: IMicroAggregationData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Микроагрегация по одной оси"
        className="flex-2"
        sx={{
          "& .MuiFormControlLabel-label": {
            width: "100px"
          }
        }}
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
            <MicroAggregationBySingleAxisInputsModal
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

export default MicroAggregationBySingleAxis;