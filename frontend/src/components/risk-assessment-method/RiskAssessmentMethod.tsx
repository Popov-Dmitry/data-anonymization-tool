import React, { ChangeEvent } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { TRiskAssessmentMethod, useRiskAssessment } from "../../providers/risk-assessment-provider";

const RiskAssessmentMethod = () => {
  const { method, setMethod } = useRiskAssessment();

  const handleChangeMethod = (event: SelectChangeEvent) => {
    setMethod({
      method: event.target.value as TRiskAssessmentMethod,
      param: undefined
    });
  };

  const handleChangeParam = (event: ChangeEvent<HTMLInputElement>) => {
    if (method?.method) {
      setMethod({
        method: method?.method,
        param: parseInt(event.target.value) || 0
      });
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Метод оценки рисков раскрытия информации</InputLabel>
      <Select
        label="Метод оценки рисков раскрытия информации"
        variant="outlined"
        value={method?.method}
        onChange={handleChangeMethod}
      >
        <MenuItem value="prosecutorMetricA">Превышение порогового значения</MenuItem>
        <MenuItem value="prosecutorMetricB">Максимальная вероятность</MenuItem>
        <MenuItem value="prosecutorMetricC">Среднее</MenuItem>
        <MenuItem value="withoutIdentificationTable">При неизвестной внешней БД</MenuItem>
      </Select>
      {(method?.method === "prosecutorMetricA" || method?.method === "withoutIdentificationTable") && (
        <TextField
          className="mt-16px"
          variant="outlined"
          label={method?.method === "prosecutorMetricA" ? "Порог" : "Пропорция"}
          type="number"
          fullWidth
          value={method.param}
          onChange={handleChangeParam}
        />
      )}
    </FormControl>
  );
};

export default RiskAssessmentMethod;
