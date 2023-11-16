import "./Methods.scss";
import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch, TextField, Tooltip } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import { joinClassNames } from "../../utils/join-class-names";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IValueReplacementData {
  column: string;
}

const ValueReplacement = ({ column }: IValueReplacementData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "ValueReplacement",
        params: {
          nameColumn : column,
          value
        }
      }]);
    }
  }, [addData, column, isTriggered, value, selected]);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <div className={joinClassNames(bem("approved"), "flex-shrink-0")}>
        <FormControlLabel
          control={<Switch
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
          />}
          label="Замена значения"
        />
        <Tooltip title="Одобрено Роскомнадзором">
          <img src={require('../../assets/RKN.png')} height={14} width={14} />
        </Tooltip>
      </div>
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