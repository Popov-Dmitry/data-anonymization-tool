import React, { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const DateAging = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [countDays, setCountDays] = useState<number>(1);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Дата старения"
        className="flex-2"
      />
      {selected && (
        <TextField
          variant="standard"
          label="Количество дней"
          type="number"
          value={countDays}
          className="flex-1"
          onChange={(event) => setCountDays(parseInt(event.target.value))}
        />
      )}
    </div>
  );
};

export default DateAging;