import "./Methods.scss";
import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const ValueReplacement = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Замена значения"
        className="flex-shrink-0"
      />
      {selected && (
        <TextField
          variant="standard"
          label="Новое значение"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      )}
    </div>
  );
};

export default ValueReplacement;