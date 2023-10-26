import "./Methods.scss";
import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { bemElement } from "../../utils/bem-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const ValueReplacementByPattern = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [regex, setRegex] = useState<string>("");
  const [replacement, setReplacement] = useState<string>("");

  return (
    <div className={baseClassName}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Замена значения по паттерну"
      />
      {selected && (
        <div className={bem("row")}>
          <TextField
            variant="standard"
            label="Паттерн для замены"
            type="text"
            value={regex}
            onChange={(event) => setRegex(event.target.value)}
          />
          <ArrowForwardIcon color="action" />
          <TextField
            variant="standard"
            label="Новое значение"
            type="text"
            value={replacement}
            onChange={(event) => setReplacement(event.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ValueReplacementByPattern;