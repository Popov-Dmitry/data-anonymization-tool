import React, { useState } from "react";
import { FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

enum DataType {
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  DOUBLE = "DOUBLE",
  DATE = "DATE"
}

const ValueVariance = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);
  const [dataType, setDataType] = useState<DataType>(DataType.INTEGER);

  return (
    <div className={baseClassName}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Шум"
      />
      {selected && (
        <div className={joinClassNames(bem("row"), "gap-16px")}>
          <div className={joinClassNames(bem("full-width"), "flex-2")}>
            <InputLabel id="value-variance-select-label">Тип данных</InputLabel>
            <Select
              label="Тип данных"
              labelId="value-variance-select-label"
              size="small"
              fullWidth
              value={dataType}
              onChange={(event) => setDataType(event.target.value as DataType)}
            >
              <MenuItem value={DataType.INTEGER}>{DataType.INTEGER}</MenuItem>
              <MenuItem value={DataType.FLOAT}>{DataType.FLOAT}</MenuItem>
              <MenuItem value={DataType.DOUBLE}>{DataType.DOUBLE}</MenuItem>
              <MenuItem value={DataType.DATE}>{DataType.DATE}</MenuItem>
            </Select>
          </div>
          <TextField
            className="flex-1"
            variant="standard"
            label="Процент"
            type="number"
            value={percent}
            onChange={(event) => setPercent(parseInt(event.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default ValueVariance;