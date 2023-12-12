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

const Round = ({ column }: IDateAgingData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [precision, setPrecision] = useState<number>(0);
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "Round",
        params: {
          nameColumn : column,
          precision
        }
      }]);
    }
  }, [addData, column, isTriggered, precision, selected]);

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
          onChange={(event) => setPrecision(parseFloat(event.target.value))}
        />
      )}
    </div>
  );
};

export default Round;