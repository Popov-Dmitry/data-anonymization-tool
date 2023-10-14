import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IMicroAggregationData {
  k: number;
  setK: (k: number) => void;
}

const MicroAggregation = ({ k, setK }: IMicroAggregationData) => {
  const [selected, setSelected] = useState<boolean>(false);

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
        <TextField
          className="flex-1"
          variant="standard"
          label="k"
          type="number"
          value={k}
          onChange={(event) => setK(parseInt(event.target.value))}
        />
      )}
    </div>
  );
};

export default MicroAggregation;