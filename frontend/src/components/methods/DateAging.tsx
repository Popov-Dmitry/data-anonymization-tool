import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IDateAgingData {
  column: string;
}

const DateAging = ({ column }: IDateAgingData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [countDays, setCountDays] = useState<number>(1);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "DateAging",
        params: {
          nameColumn : column,
          countDays
        }
      }]);
    }
  }, [addData, column, countDays, isTriggered, selected]);

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
          className="flex-1"
          variant="standard"
          label="Количество дней"
          type="number"
          value={countDays}
          onChange={(event) => setCountDays(parseInt(event.target.value))}
        />
      )}
    </div>
  );
};

export default DateAging;