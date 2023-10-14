import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const Round = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [precision, setPrecision] = useState<number>(0);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Округление"
        className="flex-2"
      />
      {selected && (
        <TextField
          className="flex-1"
          variant="standard"
          label="Точность"
          type="number"
          value={precision}
          onChange={(event) => setPrecision(parseInt(event.target.value))}
        />
      )}
    </div>
  );
};

export default Round;