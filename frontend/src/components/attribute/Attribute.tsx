import React, { useEffect } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { TAttributeType, useRiskAssessment } from "../../providers/risk-assessment-provider";

interface IAttributeData {
  column: string;
}

const Attribute = ({ column }: IAttributeData) => {
  const { changeAttributeType, attributesType } = useRiskAssessment();
  const [value, setValue] = React.useState<TAttributeType>("identifier");
  console.log(value);

  useEffect(() => {
    const type = attributesType.find((attribute) => attribute.name === column)?.type;
    if (type) {
      setValue(type);
    }
  }, [attributesType, column]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeAttributeType({
      name: column,
      type: (event.target as HTMLInputElement).value as TAttributeType
    });
  };

  return (
    <FormControl>
      <Typography className="font-semibold">{column}</Typography>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="identifier" control={<Radio />} label="Прямой идентификатор" />
        <FormControlLabel value="quasi-identifier" control={<Radio />} label="Квазиидентификатор" />
        <FormControlLabel value="sensitive" control={<Radio />} label="Чувствительный признак" />
      </RadioGroup>
    </FormControl>
  );
};

export default Attribute;
