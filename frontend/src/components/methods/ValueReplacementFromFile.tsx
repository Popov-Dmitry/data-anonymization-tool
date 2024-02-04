import "./Methods.scss";
import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch, TextField, Tooltip } from "@mui/material";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";
import { bemElement } from "../../utils/bem-class-names";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IValueReplacementFromFileData {
  column: string;
}

const ValueReplacementFromFile = ({ column }: IValueReplacementFromFileData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [nameFile, setNameFile] = useState<string>("");
  const { addData, isTriggered } = useMethodsInputs();

  useEffect(() => {
    if (isTriggered && selected) {
      addData([{
        method: "ValueReplacementFromFile",
        params: {
          nameColumn : column,
          nameFile
        }
      }]);
    }
  }, [addData, column, isTriggered, nameFile, selected]);

  return (
    <div className={baseClassName}>
      <div className={bem("approved")}>
        <FormControlLabel
          control={<Switch
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
          />}
          label="Замена значения из файла"
        />
        <div className={bem("row")}>
          <Tooltip title="Одобрено Роскомнадзором">
            <img src={require('../../assets/RKN.png')} alt="Одобрено Роскомнадзором" height={14} width={14} />
          </Tooltip>
          {selected && (
            <Tooltip title="Из файла берется случайная строка и подставляется вместо значения в таблице">
              <HelpOutlineIcon className={bem("help-icon")} />
            </Tooltip>
          )}
        </div>
      </div>
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