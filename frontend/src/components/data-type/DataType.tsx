import React, { useEffect } from "react";
import { TAttributeDataType, useAttributesTypes } from "../../providers/attributes-types-provider";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

interface IDataTypeData {
  column: string;
}

const DataType = ({ column }: IDataTypeData) => {
  const { changeAttributeDataType, attributesDataType } = useAttributesTypes();
  const [value, setValue] = React.useState<TAttributeDataType>("string");

  useEffect(() => {
    const type = attributesDataType.find((attribute) => attribute.name === column)?.dataType;
    if (type) {
      setValue(type);
    }
  }, [attributesDataType, column]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeAttributeDataType({
      name: column,
      dataType: (event.target as HTMLInputElement).value as TAttributeDataType
    });
  };

  return (
    <FormControl>
      <Typography className="font-semibold">{column}</Typography>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="string" control={<Radio />} label="Строковый" />
        <FormControlLabel value="integer" control={<Radio />} label="Целочисленный" />
        <FormControlLabel value="decimal" control={<Radio />} label="Количественный" />
        <FormControlLabel value="ordinal" control={<Radio />} label="Порядковый" />
        <FormControlLabel value="date" control={<Radio />} label="Дата/время" />
      </RadioGroup>
    </FormControl>
  );
};

export default DataType;