import "./Methods.scss";
import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";

const baseClassName = "method";

const ValueReplacementFromFile = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [nameFile, setNameFile] = useState<string>("");

  return (
    <div className={baseClassName}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Замена значения из файла"
        className="flex-shrink-0"
      />
      {selected && (
        <TextField
          variant="standard"
          label="Путь к файлу"
          type="text"
          fullWidth
          value={nameFile}
          onChange={(event) => setNameFile(event.target.value)}
        />
      )}
    </div>
  );
};

export default ValueReplacementFromFile;