import React, { useState } from "react";
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IMicroAggregationData {
  k: number;
  setK: (k: number) => void;
}

const MicroAggregationBySingleAxis = ({ k, setK }: IMicroAggregationData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [isAxisColumn, setIsAxisColumn] = useState<boolean>(false);

  return (
    <div className={baseClassName}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Микроагрегация по одной оси"
      />
      {selected && (
        <div className={joinClassNames(bem("row"), "gap-16px")}>
          <TextField
            variant="standard"
            label="k"
            type="number"
            value={k}
            onChange={(event) => setK(parseInt(event.target.value))}
          />
          <FormControlLabel
            control={<Checkbox
              checked={isAxisColumn}
              onChange={(event) => setIsAxisColumn(event.target.checked)}
            />}
            label="Осевой столбец"
            className="flex-shrink-0"
          />
        </div>
      )}
    </div>
  );
};

export default MicroAggregationBySingleAxis;