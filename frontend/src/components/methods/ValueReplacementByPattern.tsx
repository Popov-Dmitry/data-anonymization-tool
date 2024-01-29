import "./Methods.scss";
import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch, TextField, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { bemElement } from "../../utils/bem-class-names";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IValueReplacementByPatternData {
  column: string;
}

const ValueReplacementByPattern = ({ column }: IValueReplacementByPatternData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [regex, setRegex] = useState<string>("");
  const [replacement, setReplacement] = useState<string>("");
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "ValueReplacementByPattern",
        params: {
          nameColumn : column,
          regex,
          replacement
        }
      }]);
    }
  }, [addData, column, isTriggered, regex, replacement, selected]);

  return (
    <div className={baseClassName}>
      <div className={bem("approved")}>
        <FormControlLabel
          control={<Switch
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
          />}
          label="Замена значения по паттерну"
        />
        <Tooltip title="Одобрено Роскомнадзором">
          <img src={require('../../assets/RKN.png')} alt="Одобрено Роскомнадзором" height={14} width={14} />
        </Tooltip>
      </div>
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